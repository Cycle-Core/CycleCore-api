import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ObjService } from './obj.service';
import { CreateObjDto } from './dto/create-obj.dto';
import { UpdateObjDto } from './dto/update-obj.dto';

@Controller()
export class ObjController {
  constructor(private readonly objService: ObjService) {}

  @MessagePattern('createObj')
  create(@Payload() createObjDto: CreateObjDto) {
    return this.objService.create(createObjDto);
  }

  @MessagePattern('findAllObj')
  findAll() {
    return this.objService.findAll();
  }

  @MessagePattern('findOneObj')
  findOne(@Payload() id: number) {
    return this.objService.findOne(id);
  }

  @MessagePattern('updateObj')
  update(@Payload() updateObjDto: UpdateObjDto) {
    return this.objService.update(updateObjDto.id, updateObjDto);
  }

  @MessagePattern('removeObj')
  remove(@Payload() id: number) {
    return this.objService.remove(id);
  }
}
