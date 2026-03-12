import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CampaignDocument = HydratedDocument<Campaign>;

export type CampaignStatus = 'active' | 'paused' | 'ended';

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true })
  advertiser!: string;

  @Prop({ required: true, type: Date })
  startDate!: Date;

  @Prop({ required: true, type: Date })
  endDate!: Date;

  @Prop({ required: true, min: 0 })
  budget!: number;

  @Prop({ required: true, min: 0, default: 0 })
  impressionsServed!: number;

  @Prop({ required: true, type: [String] })
  targetCountries!: string[];

  @Prop({ required: true, enum: ['active', 'paused', 'ended'], default: 'active' })
  status!: CampaignStatus;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
