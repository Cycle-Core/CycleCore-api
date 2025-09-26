import { Module } from '@nestjs/common';
import { ObjectsController } from './objects.controller';
import { ObjectsService } from './objects.service';
import { SchemaModule } from './schema/schema.module';
import { ObjModule } from './obj/obj.module';
import { AttributeModule } from './attribute/attribute.module';
import { ValueModule } from './value/value.module';
import { TrackerModule } from './tracker/tracker.module';
import { EpisodeModule } from './episode/episode.module';
import { EpiSchemaModule } from './epi-schema/epi-schema.module';
import { ObjTypeModule } from './obj-type/obj-type.module';

@Module({
  imports: [SchemaModule, ObjModule, AttributeModule, ValueModule, TrackerModule, EpisodeModule, EpiSchemaModule, ObjTypeModule],
  controllers: [ObjectsController],
  providers: [ObjectsService],
})
export class ObjectsModule {}
