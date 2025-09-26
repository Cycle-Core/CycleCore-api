import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
          password: process.env.REDIS_PASSWORD || undefined,
          username: process.env.REDIS_USERNAME || undefined,
        },
      },
    ]),
  ],
  controllers: [ApiController, UsersController],
  providers: [ApiService, UsersService],
})
export class ApiModule { }
