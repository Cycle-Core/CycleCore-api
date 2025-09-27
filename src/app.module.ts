import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjestsModule } from './objests/objests.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ObjestsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
