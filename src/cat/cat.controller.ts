import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CatDto } from './dto/cat.dto';
import { CatQueryDto } from './dto/cat-query.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('cat')
@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Get()
  @ApiOperation({
    summary:
      'Get all cats with limit and offset optional query and sorting params',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
    example: 'ASC',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    example: 'name',
  })
  getCats(@Query() query?: CatQueryDto) {
    return this.catService.getAllCats(query);
  }

  @Get('/:id')
  getSingleCats(@Param('id', ParseIntPipe) id: number) {
    return this.catService.getSingleCat(id);
  }

  @Post()
  addCat(@Body() body: CatDto) {
    return this.catService.addCat(body);
  }

  @Delete('/:id')
  deleteCat(@Param('id', ParseIntPipe) id: number) {
    return this.catService.deleteCat(id);
  }
}
