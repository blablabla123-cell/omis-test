import { ApiProperty } from '@nestjs/swagger';
import {
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

  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  id?: number;

  @ApiProperty({
    example: '1a0a0a0a-1a0a-1a0a-1a0a-1a0a0a0a0a0a',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsInt()
  @IsPositive()
  metricId: number;

  @ApiProperty({
    example: 10,
    required: true,
  })
  @IsPositive()
  @IsInt()
  factValue: number;

  @ApiProperty({
    example: '2023-01-01',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  period: string;
}
