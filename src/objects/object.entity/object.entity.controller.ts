import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ObjectEntityService } from './object.entity.service';
import { ObjectEntity } from './object.entity';
import { createObject } from 'rxjs/internal/util/createObject';
import { CreateObjectDto } from '../dto/create-object.dto';
import { UpdateObjectDto } from '../dto/update-object.dto';

@Controller('objects')
export class ObjectEntityController {
    constructor(private readonly objectEntityService: ObjectEntityService) {}

    @Get()
    findAll() {
        return this.objectEntityService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.objectEntityService.findOne(id);
    }

    @Post()
    create(@Body() createObjectDto: CreateObjectDto) {
        return this.objectEntityService.create(createObjectDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() UpdateObjectDto: UpdateObjectDto) {
        return this.objectEntityService.update(id, UpdateObjectDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.objectEntityService.remove(id);
    }
}
