import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CatDto } from './dto/cat.dto';
import { CatQueryDto } from './dto/cat-query.dto';

@Injectable()
export class CatService {
  constructor(@InjectRepository(Cat) private catRepo: Repository<Cat>) {}

  async getAllCats(paginationQuery?: CatQueryDto) {
    if (!paginationQuery) {
      const result = await this.catRepo.find({
        order: { [paginationQuery.sort]: 'ASC' },
      });
      return { result };
    }

    const { limit, offset, sort, order, name } = paginationQuery;

    const sortQuery = sort ?? 'dateCreated';
    const orderQuery = order ?? 'ASC';
    const nameQuery = name ?? '';
    const queryOptions: FindManyOptions = {
      order: { [sortQuery]: orderQuery },
      take: limit,
      skip: offset,
    };

    if (nameQuery) queryOptions.where = { name: nameQuery };

    const [result, amount] = await this.catRepo.findAndCount(queryOptions);

    return { result, amount };
  }

  async getSingleCat(id: number) {
    const cat = await this.catRepo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException();
    return cat;
  }

  addCat(data: CatDto) {
    const product = this.catRepo.create(data);
    return this.catRepo.save(product);
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
