import { Module } from '@nestjs/common';
import { ObjTypeService } from './obj-type.service';
import { ObjTypeController } from './obj-type.controller';

@Module({
  controllers: [ObjTypeController],
  providers: [ObjTypeService],
})
export class ObjTypeModule {}
