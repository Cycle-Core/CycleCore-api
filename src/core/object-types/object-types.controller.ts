import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, Res, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ObjectTypesService } from './object-types.service';
import { CreateObjectTypeDto } from './dto/create-object-type.dto';
import { UpdateObjectTypeDto } from './dto/update-object-type.dto';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Controller('object-types')
export class ObjectTypesController {
  constructor(private readonly objectTypesService: ObjectTypesService) { }

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

  @Get(':id/export')
  export(@Param('id') id: string, @Res() res: Response) {
    return this.objectTypesService.exportOneType(+id, res);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importObjectType(@UploadedFile() file: Express.Multer.File) {

    const jsonString = file.buffer.toString('utf8');
    const plainObject = JSON.parse(jsonString);

    const dto = plainToInstance(CreateObjectTypeDto, plainObject);

    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Validation failed for imported file',
        errors,
      });
    }

    return this.objectTypesService.create(dto);
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
