import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class PerfomanceReviewDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsInt()
  @IsPositive()
  metricId: number;

  @IsNumber()
  @IsPositive()
  @IsInt()
  factValue: number;

  @IsDate()
  period: Date;
}
