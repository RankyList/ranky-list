import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Injectable()
export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions():
    | MysqlConnectionOptions
    | Promise<MysqlConnectionOptions> {
    return {
      type: 'mysql', // although we use mariadb, this is a workaround because nestjsx/crud doesn't use backticks with mariadb https://github.com/nestjsx/crud/issues/696
      host: this.configService.getOrThrow('MARIADB_HOST'),
      port: parseInt(this.configService.getOrThrow('MARIADB_PORT'), 10) || 3306,
      username: this.configService.getOrThrow('MARIADB_USERNAME'),
      password: this.configService.getOrThrow('MARIADB_PASSWORD'),
      database: this.configService.getOrThrow('MARIADB_DATABASE'),
      logging: true,
      entities: [__dirname + '/../**/*.entity.js'],
      migrationsRun: this.configService.getOrThrow('NODE_ENV') === 'dev',
      migrationsTableName: 'migrations',
      migrations: [__dirname + '/../../migrations/generated/*.ts'],
      namingStrategy: new SnakeNamingStrategy()
    };
  }
}
