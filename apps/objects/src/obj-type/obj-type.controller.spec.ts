import { Test, TestingModule } from '@nestjs/testing';
import { ObjTypeController } from './obj-type.controller';
import { ObjTypeService } from './obj-type.service';

describe('ObjTypeController', () => {
  let controller: ObjTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjTypeController],
      providers: [ObjTypeService],
    }).compile();

    controller = module.get<ObjTypeController>(ObjTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
