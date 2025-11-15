import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USERNAME || 'test',
            password: process.env.DB_PASSWORD || 'test',
            database: process.env.DB_NAME || 'cycle_core',
            autoLoadEntities: true,
            synchronize: process.env.TYPEORM_SYNC ? process.env.TYPEORM_SYNC === 'true' : true,
            ssl: {
                rejectUnauthorized: false
              },
        }),
    ],
})
export class DatabaseModule {}
