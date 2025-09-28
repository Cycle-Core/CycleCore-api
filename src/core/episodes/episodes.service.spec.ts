import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesService } from './episodes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';

describe('EpisodesService', () => {
  let service: EpisodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EpisodesService,
        { provide: getRepositoryToken(Episode), useValue: {} }
      ],
    }).compile();

    service = module.get<EpisodesService>(EpisodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
