import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from 'src/cat/entities/cat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'develop',
      entities: [Cat],
      synchronize: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class DataBaseModule {}
