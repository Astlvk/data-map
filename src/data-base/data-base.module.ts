import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entityList } from './entity-list';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'develop',
      entities: [...entityList],
      synchronize: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class DataBaseModule {}
