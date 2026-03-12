import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ServeAdDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  country!: string;
}
