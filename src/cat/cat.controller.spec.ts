import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { Cat } from './cat.entity';
import { CatQueryDto } from './dto/cat-query.dto';

describe('CatController', () => {
  let controller: CatController;
  let fakeCatService: Partial<CatService>;

  beforeEach(async () => {
    fakeCatService = {
      getAllCats: (_paginationQuery?: CatQueryDto) => {
        return Promise.resolve({
          result: [
            { name: 'Cat', breed: 'Ragdoll', id: 1, weight: '4kg' },
          ] as Cat[],
          amount: undefined,
        });
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [
        {
          provide: CatService,
          useValue: fakeCatService,
        },
      ],
    }).compile();

    controller = module.get<CatController>(CatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getCats returns a list of cats with the properties', async () => {
    const cats = await controller.getCats();
    expect(cats.result.length).toEqual(1);
    expect(cats.result[0]).toHaveProperty('name');
    expect(cats.result[0].breed).toEqual('Ragdoll');
  });
});
