import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { entities } from './src/database/entities';
config();

const postgresDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'pizzaria',
  entities: [...entities],
  migrations: ['src/database/migrations/**'],
  synchronize: false,
};

export default new DataSource(postgresDataSourceOptions);
