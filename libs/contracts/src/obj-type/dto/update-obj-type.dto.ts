import { PartialType } from '@nestjs/mapped-types';
import { CreateObjTypeDto } from './create-obj-type.dto';

export class UpdateObjTypeDto extends PartialType(CreateObjTypeDto) {
  id: number;
}
