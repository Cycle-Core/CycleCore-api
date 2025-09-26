import { Test, TestingModule } from '@nestjs/testing';
import { ObjectsController } from './objects.controller';
import { ObjectsService } from './objects.service';

describe('ObjectsController', () => {
  let objectsController: ObjectsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ObjectsController],
      providers: [ObjectsService],
    }).compile();

    objectsController = app.get<ObjectsController>(ObjectsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(objectsController.getHello()).toBe('Hello World!');
    });
  });
});
