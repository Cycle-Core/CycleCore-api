// src/core/users/users.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async createUser(dto: RegisterUserDto): Promise<User> {
    if (dto.password !== dto.confirmPassword) {
      throw new ConflictException('Passwords do not match');
    }

    const existing = await this.usersRepo.findOne({
      where: [
        { email: dto.email.toLowerCase() },
        { username: dto.username.toLowerCase() },
      ],
      withDeleted: true,
    });

    if (existing) {
      throw new ConflictException(
        'A user with this email or username already exists',
      );
    }

    const passwordHash = await this.hashPassword(dto.password);

    const user = this.usersRepo.create({
      email: dto.email.toLowerCase(),
      username: dto.username.toLowerCase(),
      passwordHash,
    });

    return this.usersRepo.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmailOrUsername(identifier: string): Promise<User | null> {
    const lowered = identifier.toLowerCase();
    return this.usersRepo.findOne({
      where: [{ email: lowered }, { username: lowered }],
    });
  }

  async validateUserPassword(
    identifier: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.findByEmailOrUsername(identifier);
    if (!user || !user.isActive) {
      return null;
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return null;
    }

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }
}
