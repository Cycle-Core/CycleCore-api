import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TrackerService } from './tracker.service';
import { CreateTrackerDto } from './dto/create-tracker.dto';
import { UpdateTrackerDto } from './dto/update-tracker.dto';

@Controller()
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @MessagePattern('createTracker')
  create(@Payload() createTrackerDto: CreateTrackerDto) {
    return this.trackerService.create(createTrackerDto);
  }

  @MessagePattern('findAllTracker')
  findAll() {
    return this.trackerService.findAll();
  }

  @MessagePattern('findOneTracker')
  findOne(@Payload() id: number) {
    return this.trackerService.findOne(id);
  }

  @MessagePattern('updateTracker')
  update(@Payload() updateTrackerDto: UpdateTrackerDto) {
    return this.trackerService.update(updateTrackerDto.id, updateTrackerDto);
  }

  @MessagePattern('removeTracker')
  remove(@Payload() id: number) {
    return this.trackerService.remove(id);
  }
}
