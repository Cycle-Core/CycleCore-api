import { Injectable } from '@nestjs/common';
import { CreateEpiSchemaDto } from './dto/create-epi-schema.dto';
import { UpdateEpiSchemaDto } from './dto/update-epi-schema.dto';

@Injectable()
export class EpiSchemaService {
  create(createEpiSchemaDto: CreateEpiSchemaDto) {
    return 'This action adds a new epiSchema';
  }

  findAll() {
    return `This action returns all epiSchema`;
  }

  findOne(id: number) {
    return `This action returns a #${id} epiSchema`;
  }

  update(id: number, updateEpiSchemaDto: UpdateEpiSchemaDto) {
    return `This action updates a #${id} epiSchema`;
  }

  remove(id: number) {
    return `This action removes a #${id} epiSchema`;
  }
}
