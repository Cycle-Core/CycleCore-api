import { HttpException, Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Episode } from './entities/episode.entity';
import { Repository } from 'typeorm';
import { Lifeline } from '../lifelines/entities/lifeline.entity';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private episodesRepository: Repository<Episode>,
    @InjectRepository(Lifeline)
    private lifelineRepository: Repository<Lifeline>,
  ) {}

  async create(createEpisodeDto: CreateEpisodeDto) {
    const { lifelineId, index,...episodeData } = createEpisodeDto;

    if (!index || index < 0) {
      throw new HttpException('Index must be a positive integer', 400);
    }

    const lifeline = await this.lifelineRepository.findOneBy({ id: lifelineId });

    if (!lifeline) {
      throw new HttpException(`Lifeline with id ${lifelineId} not found`, 404);
    }

    const episode = this.episodesRepository.create({
      ...episodeData,
      lifeline,
      index
    });
    
    return this.episodesRepository.save(episode);
  }

  async findAll(max?: number) {
    if (!max) {
      max = 10;
    }
    return await this.episodesRepository.find({
      take: max
    });
  }

  async findOne(id: number) {
    const episode = await this.episodesRepository.findOne({ where: { id } });
    if (!episode) {
      throw new HttpException(`Episode with id ${id} not found`, 404);
    }
    return episode;
  }

  async update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    const existingEpisode = await this.episodesRepository.findOne({
       where: { id } ,
        relations: ['lifeline']
    });
 
    if (!existingEpisode) {
      throw new HttpException(`Episode with id ${id} not found`, 404);
    }

    const { lifelineId, ...episodeData } = updateEpisodeDto;

    if (lifelineId && lifelineId !== existingEpisode.lifeline.id) {
      const lifeline = await this.lifelineRepository.findOneBy({ id: lifelineId });

      if (!lifeline) {      
        throw new HttpException(`Lifeline with id ${lifelineId} not found`, 404);
      }

      existingEpisode.lifeline = lifeline;
    }

    Object.assign(existingEpisode, episodeData);
    return this.episodesRepository.update(id, existingEpisode);
  }

  async remove(id: number) {
    const episode = await this.episodesRepository.findOneBy({ id });

    if (!episode) {
      throw new HttpException(`Episode with id ${id} not found`, 404);
    }

    return await this.episodesRepository.delete(id);
  }

  async getEpisodesByLifeline(lifelineId: number, max?: number) {
    const lifeline = await this.lifelineRepository.findOneBy({ id: lifelineId });

    if (!lifeline) {
      throw new HttpException(`Lifeline with id ${lifelineId} not found`, 404);
    }

    const options: any = {
      where: { lifeline: { id: lifelineId } },
      order: { index: 'ASC' },
    };
    if (typeof max === 'number') {
      options.take = max;
    }
    return this.episodesRepository.find(options);
  }
}
