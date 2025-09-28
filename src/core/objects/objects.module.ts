import { Module } from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { ObjectsController } from './objects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectEntity } from './entities/object.entity';
import { ObjectType } from '../object-types/entities/object-type.entity';
import { Lifeline } from '../lifelines/entities/lifeline.entity';
import { LifelinesService } from '../lifelines/lifelines.service';
import { LifelinesModule } from '../lifelines/lifelines.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ObjectEntity, ObjectType, Lifeline]),
    LifelinesModule
  ],
  controllers: [ObjectsController],
  providers: [ObjectsService],
})
export class ObjectsModule {}
