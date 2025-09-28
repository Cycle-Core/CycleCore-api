import { Test, TestingModule } from '@nestjs/testing';
import { ObjectsService } from './objects.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectEntity } from './entities/object.entity';
import { ObjectType } from '../object-types/entities/object-type.entity';
import { Lifeline } from '../lifelines/entities/lifeline.entity';

describe('ObjectsService', () => {
  let service: ObjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObjectsService,
        {
          provide: getRepositoryToken(ObjectEntity), useValue: {}, // mock repository
        },
        { provide: getRepositoryToken(ObjectType), useValue: {} },
        { provide: getRepositoryToken(Lifeline), useValue: {} },
      ],
    }).compile();

    service = module.get<ObjectsService>(ObjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
