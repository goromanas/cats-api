import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CatDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  breed: string;

  @IsString()
  @ApiProperty()
  weight: string;
}
