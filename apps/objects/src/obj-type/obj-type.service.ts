import { Injectable } from '@nestjs/common';
import { CreateObjTypeDto } from './dto/create-obj-type.dto';
import { UpdateObjTypeDto } from './dto/update-obj-type.dto';

@Injectable()
export class ObjTypeService {
  create(createObjTypeDto: CreateObjTypeDto) {
    return 'This action adds a new objType';
  }

  findAll() {
    return `This action returns all objType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} objType`;
  }

  update(id: number, updateObjTypeDto: UpdateObjTypeDto) {
    return `This action updates a #${id} objType`;
  }

  remove(id: number) {
    return `This action removes a #${id} objType`;
  }
}
