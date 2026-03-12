import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  advertiser!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsNumber()
  @Min(0)
  budget!: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  targetCountries!: string[];

  @IsOptional()
  @IsString()
  status?: 'active' | 'paused' | 'ended';
}
