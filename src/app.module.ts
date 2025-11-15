import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './core/users/users.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    CoreModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
