import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@app/contracts';
import { User } from '@app/models'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepositery: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepositery.create(createUserDto);
    return this.userRepositery.save(user);
  }

  async findAll() {
    return this.userRepositery.find();
  }

  async findOne(id: number) {
    return this.userRepositery.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepositery.update(id, updateUserDto);
    return this.userRepositery.findOneBy({id});
  }

  async remove(id: number) {
    await this.userRepositery.delete(id);
    return { deleted: true };
  }
}
