import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EpiSchemaService } from './epi-schema.service';
import { CreateEpiSchemaDto } from './dto/create-epi-schema.dto';
import { UpdateEpiSchemaDto } from './dto/update-epi-schema.dto';

@Controller()
export class EpiSchemaController {
  constructor(private readonly epiSchemaService: EpiSchemaService) {}

  @MessagePattern('createEpiSchema')
  create(@Payload() createEpiSchemaDto: CreateEpiSchemaDto) {
    return this.epiSchemaService.create(createEpiSchemaDto);
  }

  @MessagePattern('findAllEpiSchema')
  findAll() {
    return this.epiSchemaService.findAll();
  }

  @MessagePattern('findOneEpiSchema')
  findOne(@Payload() id: number) {
    return this.epiSchemaService.findOne(id);
  }

  @MessagePattern('updateEpiSchema')
  update(@Payload() updateEpiSchemaDto: UpdateEpiSchemaDto) {
    return this.epiSchemaService.update(updateEpiSchemaDto.id, updateEpiSchemaDto);
  }

  @MessagePattern('removeEpiSchema')
  remove(@Payload() id: number) {
    return this.epiSchemaService.remove(id);
  }
}
