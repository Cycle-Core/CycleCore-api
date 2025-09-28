import { HttpException, Injectable } from '@nestjs/common';
import { CreateLifelineDto } from './dto/create-lifeline.dto';
import { UpdateLifelineDto } from './dto/update-lifeline.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lifeline } from './entities/lifeline.entity';
import { ObjectType } from '../object-types/entities/object-type.entity';
import { ObjectEntity } from '../objects/entities/object.entity';

@Injectable()
export class LifelinesService {
  constructor(
    @InjectRepository(Lifeline)
    private lifelineRepository: Repository<Lifeline>,
  ) { }

  async create(createLifelineDto: CreateLifelineDto) {
    const lifeline = this.lifelineRepository.create(createLifelineDto);
    return this.lifelineRepository.save(lifeline);
  }

  async findAll() {
    return await this.lifelineRepository.find();
  }

  async findOne(id: number) {
    const lifeline = await this.lifelineRepository.findOneBy({ id });

    if (!lifeline) {
      throw new HttpException(`Lifeline with id ${id} not found`, 404);
    }
    return lifeline;
  }

  async update(id: number, updateLifelineDto: UpdateLifelineDto) {
    const existingLifeline = await this.lifelineRepository.findOne({ where: { id } });

    if (!existingLifeline) {
      throw new HttpException(`Lifeline with id ${id} not found`, 404);
    }

    Object.assign(existingLifeline, updateLifelineDto);
    return this.lifelineRepository.save(existingLifeline);
  }

  async remove(id: number) {
    const lifeline = await this.lifelineRepository.findOneBy({ id });

    if (!lifeline) {
      throw new HttpException(`Lifeline with id ${id} not found`, 404);
    }
    
    return await this.lifelineRepository.delete(id);
  }

  async getAllEpisodes(id: number) {
    const lifeline = await this.lifelineRepository.findOne({
      where: { id },
      relations: ['episodes']
    });

    if (!lifeline) {
      throw new HttpException(`Lifeline with id ${id} not found`, 404);
    }

    return lifeline.episodes;
  }
}
