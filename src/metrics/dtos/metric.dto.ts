import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class MetricDto {
  constructor(name: string, targetValue: number, weight: number) {
    this.name = name;
    this.targetValue = targetValue;
    this.weight = weight;
  }

  @ApiProperty({
    example: 'Order',
    required: true,
    description: 'Metric name',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 100,
    required: true,
    description: 'Metric target value',
  })
  @IsNumber()
  @IsPositive()
  @IsInt()
  readonly targetValue: number;

  @ApiProperty({
    example: 0.5,
    required: true,
    description: 'Metric weight',
  })
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(1)
  readonly weight: number;
}
