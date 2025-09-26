import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule, {
      transport: Transport.REDIS,
      options: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
          password: process.env.REDIS_PASSWORD || undefined,
          username: process.env.REDIS_USERNAME || undefined,
        },
    },
  );
  await app.listen();
}
bootstrap();
