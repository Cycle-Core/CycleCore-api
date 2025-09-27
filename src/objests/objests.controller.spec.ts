import { Test, TestingModule } from '@nestjs/testing';
import { ObjestsController } from './objests.controller';

describe('ObjestsController', () => {
  let controller: ObjestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjestsController],
    }).compile();

    controller = module.get<ObjestsController>(ObjestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
