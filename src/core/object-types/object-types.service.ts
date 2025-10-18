import { HttpException, Injectable } from '@nestjs/common';
import { CreateObjectTypeDto } from './dto/create-object-type.dto';
import { UpdateObjectTypeDto } from './dto/update-object-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectType } from './entities/object-type.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';

import { ExportObjectTypeDto } from './dto/export-object-type.dto';
import { ImportObjectTypeDto } from './dto/import-object-type.dto';

@Injectable()
export class ObjectTypesService {
  constructor(
    @InjectRepository(ObjectType)
    private objectTypeRepository: Repository<ObjectType>,
  ) { }

  create(createObjectTypeDto: CreateObjectTypeDto) {
    const objectType = this.objectTypeRepository.create(createObjectTypeDto);
    return this.objectTypeRepository.save(objectType);
  }

  async findAll(max?: number) {
    if (!max) {
      max = 10;
    }

    return await this.objectTypeRepository.find({
      take: max,
    });
  }

  async findOne(id: number) {
    const objectType = await this.objectTypeRepository.findOne({ where: { id } });
    if (!objectType) {
      throw new HttpException(`ObjectType with id ${id} not found`, 404);
    }
    return objectType;
  }

  async update(id: number, updateObjectTypeDto: UpdateObjectTypeDto) {
    const existingObjectType = await this.objectTypeRepository.findOneBy({ id });

    if (!existingObjectType) {
      throw new HttpException(`ObjectType with id ${id} not found`, 404);
    }

    Object.assign(existingObjectType, updateObjectTypeDto);

    await this.objectTypeRepository.save(existingObjectType);
    return this.findOne(id);
  }

  async exportOneType(id: number, res: Response) {
    const objectType = await this.findOne(id);

    const dto = new ExportObjectTypeDto();
    dto.name = objectType.name;

    const fileName = `${objectType.name.replace(/\s/g, '_')}.cycle`;
    const jsonData = JSON.stringify(dto, null, 2);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

    res.send(jsonData);
  }


  async remove(id: number) {
    const objectType = await this.objectTypeRepository.findOne({
      where: { id },
      relations: ['objects'] // Load related ObjectEntity records
    });

    if (!objectType) {
      throw new HttpException(`ObjectType with id ${id} not found`, 404);
    }

    if (objectType.objects && objectType.objects.length > 0) {
      throw new HttpException(
        `Cannot delete ObjectType. ${objectType.objects.length} objects are using this type.`,
        400
      );
    }


    return await this.objectTypeRepository.delete(id);
  }
}
