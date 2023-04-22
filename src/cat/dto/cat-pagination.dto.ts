import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class CatPaginationDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  offset?: number;
}
