import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from './campaign.schema';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name)
    private readonly campaignModel: Model<CampaignDocument>,
  ) {}

  async create(dto: CreateCampaignDto) {
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      throw new BadRequestException('Invalid startDate/endDate');
    }

    if (startDate >= endDate) {
      throw new BadRequestException('startDate must be before endDate');
    }

    const created = await this.campaignModel.create({
      name: dto.name,
      advertiser: dto.advertiser,
      startDate,
      endDate,
      budget: dto.budget,
      targetCountries: dto.targetCountries,
      status: dto.status ?? 'active',
      impressionsServed: 0,
    });

    return created;
  }

  async findAll(filters: { status?: string; advertiser?: string; country?: string }) {
    const query: Record<string, unknown> = {};

    if (filters.status) query.status = filters.status;
    if (filters.advertiser) query.advertiser = filters.advertiser;
    if (filters.country) query.targetCountries = filters.country;

    return this.campaignModel.find(query).sort({ createdAt: -1 }).lean();
  }

  async serveAd(country: string) {
    const now = new Date();

    const candidates = await this.campaignModel
      .find({
        status: 'active',
        startDate: { $lte: now },
        endDate: { $gte: now },
        targetCountries: country,
      })
      .sort({ createdAt: -1 });

    const campaign = candidates.find((c) => c.impressionsServed < c.budget);

    if (!campaign) {
      throw new NotFoundException('No campaign available for this request');
    }

    await this.campaignModel.updateOne({ _id: campaign._id }, { $inc: { impressionsServed: 1 } });

    const updated = await this.campaignModel.findById(campaign._id).lean();
    return updated;
  }

  async stats() {
    const [totalCampaigns, activeCampaigns] = await Promise.all([
      this.campaignModel.countDocuments({}),
      this.campaignModel.countDocuments({ status: 'active' }),
    ]);

    const totalImpressionsAgg = await this.campaignModel.aggregate([
      { $group: { _id: null, total: { $sum: '$impressionsServed' } } },
    ]);

    const topAdvertiserAgg = await this.campaignModel.aggregate([
      { $group: { _id: '$advertiser', impressions: { $sum: '$impressionsServed' } } },
      { $sort: { impressions: -1 } },
      { $limit: 1 },
    ]);

    return {
      totalCampaigns,
      activeCampaigns,
      totalImpressions: totalImpressionsAgg[0]?.total ?? 0,
      topAdvertiser: topAdvertiserAgg[0]?._id ?? null,
    };
  }
}
