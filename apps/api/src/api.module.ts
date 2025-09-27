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
          url: `redis://${process.env.REDIS_USERNAME ? `${process.env.REDIS_USERNAME}${process.env.REDIS_PASSWORD ? `:${process.env.REDIS_PASSWORD}` : ''}@` : ''}${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
          
          // ✅ Reconnection settings
          retryAttempts: 5,
          retryDelay: 3000,
          retryStrategy: (times: number) => {
            console.log(`🔄 Redis reconnect attempt #${times}`);
            if (times > 10) return null; // stop after 10 retries
            return Math.min(times * 500, 2000); // backoff
          },
          reconnectOnError: (err) => {
            console.error('Redis reconnect error:', err);
            return true;
          },
        },
      },
    ]),
  ],
  controllers: [ApiController, UsersController],
  providers: [ApiService, UsersService],
})
export class ApiModule { }
