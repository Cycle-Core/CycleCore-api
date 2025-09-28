import { Test, TestingModule } from '@nestjs/testing';
import { ObjectTypesController } from './object-types.controller';
import { ObjectTypesService } from './object-types.service';

describe('ObjectTypesController', () => {
  let controller: ObjectTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjectTypesController],
      providers: [ObjectTypesService,
        { provide: 'ObjectTypeRepository', useValue: {} } 
      ],
    }).compile();

    controller = module.get<ObjectTypesController>(ObjectTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
