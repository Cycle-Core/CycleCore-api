import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  
  getAll(): string {
    return 'This action returns all users';
  }
}
