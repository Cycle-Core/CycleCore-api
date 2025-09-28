import { Test, TestingModule } from '@nestjs/testing';
import { LifelinesController } from './lifelines.controller';
import { LifelinesService } from './lifelines.service';

describe('LifelinesController', () => {
  let controller: LifelinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LifelinesController],
      providers: [LifelinesService,
        { provide: 'LifelineRepository', useValue: {} }],
    }).compile();

    controller = module.get<LifelinesController>(LifelinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
