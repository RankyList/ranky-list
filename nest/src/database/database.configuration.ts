import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Injectable()
export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions():
    | MysqlConnectionOptions
    | Promise<MysqlConnectionOptions> {
    return {
      type: 'mariadb',
      host: this.configService.getOrThrow('MARIADB_HOST'),
      port: parseInt(this.configService.getOrThrow('MARIADB_PORT'), 10) || 3306,
      username: this.configService.getOrThrow('MARIADB_USERNAME'),
      password: this.configService.getOrThrow('MARIADB_PASSWORD'),
      database: this.configService.getOrThrow('MARIADB_DATABASE'),
      logging: true,
      entities: [__dirname + '/../**/*.entity.js'],
      migrationsRun: this.configService.getOrThrow('NODE_ENV') === 'dev',
      migrationsTableName: 'migrations',
      migrations: [__dirname + '/../../migrations/generated/*.ts']
    };
  }
}
