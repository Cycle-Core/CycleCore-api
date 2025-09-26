import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EpisodeService } from './episode.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Controller()
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @MessagePattern('createEpisode')
  create(@Payload() createEpisodeDto: CreateEpisodeDto) {
    return this.episodeService.create(createEpisodeDto);
  }

  @MessagePattern('findAllEpisode')
  findAll() {
    return this.episodeService.findAll();
  }

  @MessagePattern('findOneEpisode')
  findOne(@Payload() id: number) {
    return this.episodeService.findOne(id);
  }

  @MessagePattern('updateEpisode')
  update(@Payload() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodeService.update(updateEpisodeDto.id, updateEpisodeDto);
  }

  @MessagePattern('removeEpisode')
  remove(@Payload() id: number) {
    return this.episodeService.remove(id);
  }
}
