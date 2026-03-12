import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { ServeAdDto } from './dto/serve-ad.dto';

@Controller()
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post('campaigns')
  create(@Body() dto: CreateCampaignDto) {
    return this.campaignsService.create(dto);
  }

  @Get('campaigns')
  findAll(
    @Query('status') status?: string,
    @Query('advertiser') advertiser?: string,
    @Query('country') country?: string,
  ) {
    return this.campaignsService.findAll({ status, advertiser, country });
  }

  @Post('serve-ad')
  serveAd(@Body() dto: ServeAdDto) {
    return this.campaignsService.serveAd(dto.country);
  }

  @Get('stats')
  stats() {
    return this.campaignsService.stats();
  }
}
