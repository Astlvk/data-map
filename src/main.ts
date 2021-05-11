import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule, utilities } from 'nest-winston';
import { transports, format } from 'winston';
import { MongoDB } from 'winston-mongodb';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // 配置日志
    logger: WinstonModule.createLogger({
      transports: [
        // 输出到控制台
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            utilities.format.nestLike(), // 处理为nest默认得console格式
          ),
        }),
        // 输出到文件
        new transports.File({
          level: 'info',
          filename: 'info.log',
        }),
        new transports.File({
          format: format.combine(
            format.timestamp(),
            utilities.format.nestLike(), // 处理为nest默认得console格式
          ),
          level: 'error',
          filename: 'error.log',
        }),
        // 输出到MongoDB
        // new MongoDB({
        //   db: 'mongodb://localhost/develop',
        //   collection: 'info_log',
        //   options: {
        //     useUnifiedTopology: true,
        //   },
        // }),
        new MongoDB({
          level: 'error',
          db: 'mongodb://localhost/develop',
          collection: 'error_log',
          options: {
            useUnifiedTopology: true,
          },
        }),
      ],
    }),
  });
  // 配置全局HttpException异常过滤器，用于记录异常日志
  app.useGlobalFilters(new HttpExceptionFilter());
  // 配置全局验证管道，配合Dto类使用
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // 配置静态资源目录
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static',
  });
  // 配置模板引擎与模板目录
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  // 配置生成api文档
  const options = new DocumentBuilder()
    .setTitle('API文档')
    .setDescription('API文档生成测试')
    .setVersion('1.0')
    .addTag('Astlvk')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // 监听服务端口
  await app.listen(3000);
}
bootstrap();
