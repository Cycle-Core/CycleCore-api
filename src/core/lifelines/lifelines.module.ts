import { Module } from '@nestjs/common';
import { LifelinesService } from './lifelines.service';
import { LifelinesController } from './lifelines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lifeline } from './entities/lifeline.entity';
import { ObjectEntity } from '../objects/entities/object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lifeline])],
  controllers: [LifelinesController],
  providers: [LifelinesService],
  exports : [LifelinesService],
})
export class LifelinesModule {}
