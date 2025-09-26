import { Injectable } from '@nestjs/common';

@Injectable()
export class ObjectsService {
  getHello(): string {
    return 'Hello World!';
  }
}
