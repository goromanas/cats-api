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
import { ApiTags } from '@nestjs/swagger';
import { GetCatsSwagger } from './decorators/get-cats-decorator';

@ApiTags('cat')
@Controller('cat')
export class CatController {
  constructor(private catService: CatService) {}

  @Get()
  @GetCatsSwagger()
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
