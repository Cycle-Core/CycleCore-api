import { Module } from '@nestjs/common';
import { EpiSchemaService } from './epi-schema.service';
import { EpiSchemaController } from './epi-schema.controller';

@Module({
  controllers: [EpiSchemaController],
  providers: [EpiSchemaService],
})
export class EpiSchemaModule {}
