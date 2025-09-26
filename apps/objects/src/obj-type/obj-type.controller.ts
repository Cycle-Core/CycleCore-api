import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ObjTypeService } from './obj-type.service';
import { CreateObjTypeDto } from './dto/create-obj-type.dto';
import { UpdateObjTypeDto } from './dto/update-obj-type.dto';

@Controller()
export class ObjTypeController {
  constructor(private readonly objTypeService: ObjTypeService) {}

  @MessagePattern('createObjType')
  create(@Payload() createObjTypeDto: CreateObjTypeDto) {
    return this.objTypeService.create(createObjTypeDto);
  }

  @MessagePattern('findAllObjType')
  findAll() {
    return this.objTypeService.findAll();
  }

  @MessagePattern('findOneObjType')
  findOne(@Payload() id: number) {
    return this.objTypeService.findOne(id);
  }

  @MessagePattern('updateObjType')
  update(@Payload() updateObjTypeDto: UpdateObjTypeDto) {
    return this.objTypeService.update(updateObjTypeDto.id, updateObjTypeDto);
  }

  @MessagePattern('removeObjType')
  remove(@Payload() id: number) {
    return this.objTypeService.remove(id);
  }
}
