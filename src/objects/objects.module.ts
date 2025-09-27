import { Module } from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { ObjectsController } from './objects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectEntity } from './object.entity/object.entity';
import { EpisodeEntity } from './episode.entity/episode.entity';
import { LifelineEntity } from './lifeline.entity/lifeline.entity';
import { ObjectTypeEntity } from './object-type.entity/object-type.entity';
import { ObjectEntityController } from './object.entity/object.entity.controller';
import { ObjectEntityService } from './object.entity/object.entity.service';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectEntity, ObjectTypeEntity, LifelineEntity, EpisodeEntity])],
  providers: [ObjectsService, ObjectEntityService],
  controllers: [ObjectsController, ObjectEntityController]
})
export class ObjectsModule {}
