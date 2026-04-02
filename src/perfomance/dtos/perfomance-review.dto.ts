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
  constructor(
    userId: string,
    metricId: number,
    factValue: number,
    period: string,
    id?: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.metricId = metricId;
    this.factValue = factValue;
    this.period = period;
  }

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

  @IsPositive()
  @IsInt()
  factValue: number;

  @IsString()
  @IsNotEmpty()
  period: string;
}
