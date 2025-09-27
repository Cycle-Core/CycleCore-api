import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectEntity } from './object.entity/object.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ObjectsService {
    constructor(
        @InjectRepository(ObjectEntity) private objectsRepository: Repository<ObjectEntity>,
    ) {}

    findAll(){
        return this.objectsRepository.find();
    }

    create(data: Partial<ObjectEntity>){
        const obj = this.objectsRepository.create(data);
        return this.objectsRepository.save(obj);
    }

    update(id: number, data: Partial<ObjectEntity>){
        return this.objectsRepository.update(id, data);
    }

    delete(id: number){
        return this.objectsRepository.delete(id);
    }
}
