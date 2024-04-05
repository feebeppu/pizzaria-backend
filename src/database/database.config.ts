import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from './entities';

export const typeormDatabaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    const baseConfig = {
      type: 'postgres',
      entities: [...entities],
      ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
    };

    return {
      ...baseConfig,
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
    } as TypeOrmModuleOptions;
  },
};
