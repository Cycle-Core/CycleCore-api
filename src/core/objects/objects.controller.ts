import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';

@Controller('objects')
export class ObjectsController {
  constructor(private readonly objectsService: ObjectsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createObjectDto: CreateObjectDto) {
    return this.objectsService.create(createObjectDto);
  }

  @Get()
  findAll(@Query('max') max?: number) {
    return this.objectsService.findAll(max);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.objectsService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() updateObjectDto: UpdateObjectDto) {
    return this.objectsService.update(+id, updateObjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.objectsService.remove(+id);
  }
}
