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
import { CatSearchDto } from './dto/cat-search.dto';

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Get('/search')
  searchCatByName(@Query('name') name: string) {
    return this.catService.searchCatByName(name);
  }

  @Get('/:id?')
  getCats(@Param() params?: CatSearchDto, @Query() query?: CatPaginationDto) {
    return this.catService.getCats(params, query);
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
