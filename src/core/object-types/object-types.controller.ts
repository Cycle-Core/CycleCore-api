import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ObjectTypesService } from './object-types.service';
import { CreateObjectTypeDto } from './dto/create-object-type.dto';
import { UpdateObjectTypeDto } from './dto/update-object-type.dto';

@Controller('object-types')
export class ObjectTypesController {
  constructor(private readonly objectTypesService: ObjectTypesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createObjectTypeDto: CreateObjectTypeDto) {
    return this.objectTypesService.create(createObjectTypeDto);
  }

  @Get()
  findAll(@Query('max') max?: number) {
    return this.objectTypesService.findAll(max);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.objectTypesService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() updateObjectTypeDto: UpdateObjectTypeDto) {
    return this.objectTypesService.update(+id, updateObjectTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.objectTypesService.remove(+id);
  }
}
