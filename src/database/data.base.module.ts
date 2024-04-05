import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormDatabaseConfig } from './database.config';

@Global()
@Module({
  imports: [TypeOrmModule.forRootAsync(typeormDatabaseConfig)],
})
export class DatabaseModule {
  static forFeature(entities = []): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forFeature(entities)],
      exports: [TypeOrmModule.forFeature(entities)],
    };
  }
}
