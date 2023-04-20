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

@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Get()
  searchCatByName(@Query('name') name: string) {
    return this.catService.searchCatByName(name);
  }

  @Get('/:id?')
  getCats(@Param('id') id?: string) {
    return this.catService.getCats(id);
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
