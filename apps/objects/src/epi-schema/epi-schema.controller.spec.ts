import { Test, TestingModule } from '@nestjs/testing';
import { EpiSchemaController } from './epi-schema.controller';
import { EpiSchemaService } from './epi-schema.service';

describe('EpiSchemaController', () => {
  let controller: EpiSchemaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpiSchemaController],
      providers: [EpiSchemaService],
    }).compile();

    controller = module.get<EpiSchemaController>(EpiSchemaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
