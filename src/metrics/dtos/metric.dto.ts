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

  @IsNumber()
  @IsPositive()
  @IsInt()
  targetValue: number;

  @IsDecimal({
    decimal_digits: '3,2',
  })
  @IsPositive()
  @Min(0)
  @Max(1)
  weight: number;
}
