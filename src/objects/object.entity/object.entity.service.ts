import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectEntity } from './object.entity';
import { CreateObjectDto } from '../dto/create-object.dto';
import { UpdateObjectDto } from '../dto/update-object.dto';

@Injectable()
export class ObjectEntityService {
  constructor(
    @InjectRepository(ObjectEntity)
    private readonly objectRepository: Repository<ObjectEntity>,
  ) {}

  async create(createObjectDto: CreateObjectDto): Promise<ObjectEntity> {
    const object = this.objectRepository.create(createObjectDto);
    return await this.objectRepository.save(object);
  }

  async findAll(): Promise<ObjectEntity[]> {
    return await this.objectRepository.find();
  }

  async findOne(id: number): Promise<ObjectEntity> {
    const object = await this.objectRepository.findOne({ where: { id } });
    if (!object) {
      throw new Error(`Object with ID ${id} not found`);
    }
    return object;
  }

  async update(id: number, updateObjectDto: UpdateObjectDto): Promise<ObjectEntity> {
    await this.objectRepository.update(id, updateObjectDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.objectRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Object with ID ${id} not found`);
    }
  }
}