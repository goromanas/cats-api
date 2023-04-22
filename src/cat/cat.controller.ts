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
import { CatPaginationDto } from './dto/cat-pagination.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('cat')
@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Get('/search')
  searchCatByName(@Query('name') name: string) {
    return this.catService.searchCatByName(name);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all cats with limit and offset optional query params',
  })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  getCats(@Query() query?: CatPaginationDto) {
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
