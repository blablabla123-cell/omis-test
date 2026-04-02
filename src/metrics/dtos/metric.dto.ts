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
  constructor(name: string, targetValue: number, weight: number, id?: number) {
    this.id = id;
    this.name = name;
    this.targetValue = targetValue;
    this.weight = weight;
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
    example: 'Order',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 100,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  @IsInt()
  targetValue: number;

  @ApiProperty({
    example: 0.5,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(1)
  weight: number;
}
