import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpisodesController],
      providers: [EpisodesService,
      { provide: getRepositoryToken(Episode), useValue: {} }
      ],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
