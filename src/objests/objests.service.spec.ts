import { Test, TestingModule } from '@nestjs/testing';
import { ObjestsService } from './objests.service';

describe('ObjestsService', () => {
  let service: ObjestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObjestsService],
    }).compile();

    service = module.get<ObjestsService>(ObjestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
