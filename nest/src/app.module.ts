import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TierListsModule } from './tier-lists/tier-lists.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfiguration } from './database/database.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.test', '.env.local', '.env'],
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration,
    }),
    TierListsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
