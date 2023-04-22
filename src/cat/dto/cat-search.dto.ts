import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class CatSearchDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  id?: number;
}
