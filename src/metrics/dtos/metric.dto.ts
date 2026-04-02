import {
  IsDecimal,
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

  @IsOptional()
  @IsInt()
  @IsPositive()
  id?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsInt()
  targetValue: number;

  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(1)
  weight: number;
}
