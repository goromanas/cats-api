import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CatDto } from './dto/cat.dto';

@Injectable()
export class CatService {
  constructor(@InjectRepository(Cat) private catRepo: Repository<Cat>) {}

  private getAllCats() {
    return this.catRepo.find();
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

  getCats(id?: string) {
    if (id) {
      try {
        const formattedId = parseInt(id);
        return this.getSingleCat(formattedId);
      } catch {
        throw new BadRequestException();
      }
    }

    return this.getAllCats();
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
