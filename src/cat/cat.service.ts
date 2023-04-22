import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CatDto } from './dto/cat.dto';
import { CatPaginationDto } from './dto/cat-pagination.dto';
import { CatSearchDto } from './dto/cat-search.dto';

@Injectable()
export class CatService {
  constructor(@InjectRepository(Cat) private catRepo: Repository<Cat>) {}

  private async getAllCats(paginationQuery?: CatPaginationDto) {
    if (!paginationQuery) return this.catRepo.find();

    const { limit, offset } = paginationQuery;

    const result = await this.catRepo.findAndCount({
      take: limit,
      skip: offset,
    });

    return result;
  }

  private async getSingleCat(id: number) {
    const cat = await this.catRepo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException();
    return cat;
  }

  addCat(data: CatDto) {
    const product = this.catRepo.create(data);
    return this.catRepo.save(product);
  }

  getCats(params?: CatSearchDto, paginationQuery?: CatPaginationDto) {
    if (params.id) return this.getSingleCat(params.id);

    return this.getAllCats(paginationQuery);
  }

  async deleteCat(id: number) {
    const cat = await this.getSingleCat(id);

    if (!cat) {
      throw new NotFoundException();
    }

    await this.catRepo.remove(cat);
  }

  searchCatByName(name: string) {
    return this.catRepo
      .createQueryBuilder('cat')
      .where('LOWER(cat.name) = LOWER(:name)', { name })
      .getMany();
  }
}