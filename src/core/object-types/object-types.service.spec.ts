import { Test, TestingModule } from '@nestjs/testing';
import { ObjectTypesService } from './object-types.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectType } from './entities/object-type.entity';

describe('ObjectTypesService', () => {
  let service: ObjectTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObjectTypesService,
        { provide: getRepositoryToken(ObjectType), useValue: {} }
      ],
    }).compile();

    service = module.get<ObjectTypesService>(ObjectTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
