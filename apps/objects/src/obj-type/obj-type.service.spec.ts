import { Test, TestingModule } from '@nestjs/testing';
import { ObjTypeService } from './obj-type.service';

describe('ObjTypeService', () => {
  let service: ObjTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObjTypeService],
    }).compile();

    service = module.get<ObjTypeService>(ObjTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
