import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InitMiddleware } from './init.middleware';
import { DataBaseModule } from './data-base/data-base.module';
import { CatModule } from './cat/cat.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DataBaseModule, CatModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InitMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
