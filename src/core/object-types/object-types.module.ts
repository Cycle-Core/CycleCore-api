import { Module } from '@nestjs/common';
import { ObjectTypesService } from './object-types.service';
import { ObjectTypesController } from './object-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectType } from './entities/object-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectType])],
  controllers: [ObjectTypesController],
  providers: [ObjectTypesService],
})
export class ObjectTypesModule {}
