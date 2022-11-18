import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

@Injectable()
export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions():
    | MongoConnectionOptions
    | Promise<MongoConnectionOptions> {
    return {
      type: 'mongodb',
      host: this.configService.getOrThrow('MONGO_HOST'),
      port: parseInt(this.configService.getOrThrow('MONGO_PORT'), 10) || 27017,
      username: this.configService.getOrThrow('MONGO_USERNAME'),
      password: this.configService.getOrThrow('MONGO_PASSWORD'),
      database: this.configService.getOrThrow('MONGO_DATABASE'),
      logging: true,
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: this.configService.getOrThrow('NODE_ENV') === 'dev',
    };
  }
}
