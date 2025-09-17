import { Module } from '@nestjs/common';
import { ObjectsController } from './objects.controller';
import { ObjectsService } from './objects.service';

@Module({
  imports: [],
  controllers: [ObjectsController],
  providers: [ObjectsService],
})
export class ObjectsModule {}
