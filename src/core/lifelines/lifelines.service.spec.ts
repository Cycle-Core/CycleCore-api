import { Test, TestingModule } from '@nestjs/testing';
import { LifelinesService } from './lifelines.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lifeline } from './entities/lifeline.entity';

describe('LifelinesService', () => {
  let service: LifelinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LifelinesService,
        { provide: getRepositoryToken(Lifeline), useValue: {} }
      ],
    }).compile();

    service = module.get<LifelinesService>(LifelinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
