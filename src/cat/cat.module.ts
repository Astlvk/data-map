import { Logger, Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';

@Module({
  controllers: [CatController],
  providers: [CatService, Logger],
})
export class CatModule {}
