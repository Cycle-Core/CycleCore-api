import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { ObjectsModule } from './objects/objects.module';
import { ObjectTypesModule } from './object-types/object-types.module';
import { LifelinesModule } from './lifelines/lifelines.module';
import { EpisodesModule } from './episodes/episodes.module';

@Module({
  providers: [CoreService],
  controllers: [CoreController],
  imports: [ObjectsModule, ObjectTypesModule, LifelinesModule, EpisodesModule]
})
export class CoreModule {}
