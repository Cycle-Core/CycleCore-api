import { Test, TestingModule } from '@nestjs/testing';
import { ObjectsService } from './objects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectEntity } from './object.entity/object.entity';

describe('ObjectsService', () => {
  let service: ObjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObjectsService,
        { provide: getRepositoryToken(ObjectEntity), useValue: {
          findAll: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        } },
      ],
    }).compile();

    service = module.get<ObjectsService>(ObjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
