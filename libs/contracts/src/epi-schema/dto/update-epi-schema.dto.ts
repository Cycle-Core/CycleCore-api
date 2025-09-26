import { PartialType } from '@nestjs/mapped-types';
import { CreateEpiSchemaDto } from './create-epi-schema.dto';

export class UpdateEpiSchemaDto extends PartialType(CreateEpiSchemaDto) {
  id: number;
}
