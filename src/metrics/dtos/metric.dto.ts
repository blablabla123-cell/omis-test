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
