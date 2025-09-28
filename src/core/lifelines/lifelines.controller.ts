import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LifelinesService } from './lifelines.service';
import { CreateLifelineDto } from './dto/create-lifeline.dto';
import { UpdateLifelineDto } from './dto/update-lifeline.dto';

@Controller('lifelines')
export class LifelinesController {
  constructor(private readonly lifelinesService: LifelinesService) {}

  @Post()
  create(@Body() createLifelineDto: CreateLifelineDto) {
    return this.lifelinesService.create(createLifelineDto);
  }

  @Get()
  findAll() {
    return this.lifelinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lifelinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLifelineDto: UpdateLifelineDto) {
    return this.lifelinesService.update(+id, updateLifelineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lifelinesService.remove(+id);
  }
}
