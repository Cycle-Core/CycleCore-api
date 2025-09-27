import { Test, TestingModule } from '@nestjs/testing';
import { ObjectEntityService } from './object.entity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectEntity } from './object.entity';

describe('ObjectEntityService', () => {
  let service: ObjectEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObjectEntityService,
        { provide: getRepositoryToken(ObjectEntity), useValue: {} }
      ],
      imports: [],
    }).compile();

    service = module.get<ObjectEntityService>(ObjectEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
