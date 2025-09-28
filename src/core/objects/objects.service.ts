import { Injectable, HttpException } from '@nestjs/common';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectEntity } from './entities/object.entity';
import { Repository } from 'typeorm';
import { ObjectType } from '../object-types/entities/object-type.entity';
import { Lifeline } from '../lifelines/entities/lifeline.entity';
import { LifelinesService } from '../lifelines/lifelines.service';

@Injectable()
export class ObjectsService {
  constructor(
    @InjectRepository(ObjectEntity)
    private objectRepository: Repository<ObjectEntity>,
    @InjectRepository(ObjectType)
    private objectTypeRepositary: Repository<ObjectType>,
    @InjectRepository(Lifeline)
    private lifelineRepository: Repository<Lifeline>,
    private lifelineService: LifelinesService,
  ) {}

  async create(createObjectDto: CreateObjectDto): Promise<ObjectEntity>{
    const { objectTypeId, lifelineId, ...objData} = createObjectDto;

    const this_objectType = await this.objectTypeRepositary.findOneBy({ id: objectTypeId });

    if (!this_objectType) {      
      throw new HttpException(`ObjectType with id ${objectTypeId} not found`, 404);
    }

    let this_lifeline: Lifeline | null = null;
    if(lifelineId) {
      this_lifeline = await this.lifelineRepository.findOneBy({ id: lifelineId });

      if (!this_lifeline) {      
        throw new HttpException(`Lifeline with id ${lifelineId} not found`, 404);
      }
    }

    const newObject = this.objectRepository.create({ 
      ...objData,
      objectType: this_objectType,
      ...(this_lifeline ? { lifeline: this_lifeline } : {})
    });

    return await this.objectRepository.save(newObject);
  }

  async findAll(max?: number) {
    if (!max) {
      max = 10;
    }
    return await this.objectRepository.find({
      take: max,
      relations: ['objectType', 'lifeline']
    });
  }

  async findOne(id: number) {
    const object = await this.objectRepository.findOne({
      where: { id },
      relations: ['objectType', 'lifeline']
    });

    if (!object) {
      throw new HttpException(`Object with id ${id} not found`, 404);
    }

    return object;
  }

  async update(id: number, updateObjectDto: UpdateObjectDto) {
    const existingObject = await this.objectRepository.findOne({
      where: { id },
      relations: ['objectType', 'lifeline']
    })

    if (!existingObject) {
      throw new HttpException(`Object with id ${id} not found`, 404);
    }

    const { objectTypeId, lifelineId, ...objData} = updateObjectDto;

    if(objectTypeId) {
      const this_objectType = await this.objectTypeRepositary.findOneBy({ id: objectTypeId });

      if (!this_objectType) {
        throw new HttpException(`ObjectType with id ${objectTypeId} not found`, 404);
      }

      existingObject.objectType = this_objectType;
    }

    if(lifelineId && (!existingObject.lifeline || lifelineId !== existingObject.lifeline.id)) {
      const this_lifeline = await this.lifelineRepository.findOneBy({ id: lifelineId });

      if (!this_lifeline) {
        throw new HttpException(`Lifeline with id ${lifelineId} not found`, 404);
      }

      if (existingObject.lifeline) {
        await this.lifelineService.remove(existingObject.lifeline.id);
      }

      existingObject.lifeline = this_lifeline;
    }

    Object.assign(existingObject, objData);

    return await this.objectRepository.save(existingObject);
  }

  async remove(id: number) {
    const object = await this.objectRepository.findOneBy({ id });
    if (!object) {
      throw new HttpException(`Object with id ${id} not found`, 404);
    }

    if (object.lifeline) {
      this.lifelineService.remove(object.lifeline.id);
    }
    return this.objectRepository.delete(id);
  }

  async getLifeline(id: number) {
    const object = await this.objectRepository.findOne({
      where: { id },
      relations: ['lifeline']
    });

    if (!object) {
      throw new HttpException(`Object with id ${id} not found`, 404);
    }

    return this.lifelineService.getAllEpisodes(object.lifeline.id);
  }
}
