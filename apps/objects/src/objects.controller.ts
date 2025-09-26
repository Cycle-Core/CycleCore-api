import { Controller, Get } from '@nestjs/common';
import { ObjectsService } from './objects.service';

@Controller()
export class ObjectsController {
  constructor(private readonly objectsService: ObjectsService) {}

  @Get()
  getHello(): string {
    return this.objectsService.getHello();
  }
}
