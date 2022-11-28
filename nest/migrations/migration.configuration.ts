import * as dotenvFlow from 'dotenv-flow';
import { DataSource } from 'typeorm';

dotenvFlow.config();

const dataSource = new DataSource({
  type: 'mariadb',
  host: process.env.MARIADB_HOST,
  port: parseInt(process.env.MARIADB_PORT as string, 10) || 3306,
  username: process.env.MARIADB_USERNAME,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  logging: true,
  entities: [__dirname + '/../dist/**/*.entity.js'],
  migrationsRun: process.env.NODE_ENV === 'dev',
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/generated/*.ts']
});

export default dataSource;
