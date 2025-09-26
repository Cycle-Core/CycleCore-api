import { Test, TestingModule } from '@nestjs/testing';
import { EpiSchemaService } from './epi-schema.service';

describe('EpiSchemaService', () => {
  let service: EpiSchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EpiSchemaService],
    }).compile();

    service = module.get<EpiSchemaService>(EpiSchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
