import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Cat } from '../cat.entity';
import { FindOptionsOrderValue } from 'typeorm';

export class CatQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  offset?: number;

  @IsOptional()
  @IsString()
  sort?: keyof Cat;

  @IsOptional()
  @IsString()
  order?: FindOptionsOrderValue;

  @IsOptional()
  @IsString()
  name?: string;
}
