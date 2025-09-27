import { Test, TestingModule } from '@nestjs/testing';
import { ObjectEntityController } from './object.entity.controller';
import { ObjectEntityService } from './object.entity.service';

describe('ObjectEntityController', () => {
  let controller: ObjectEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjectEntityController],
      providers: [
        { provide: ObjectEntityService, useValue: {} }
      ],
    }).compile();

    controller = module.get<ObjectEntityController>(ObjectEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
