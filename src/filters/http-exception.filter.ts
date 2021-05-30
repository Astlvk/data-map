import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    try {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();

      const errorMsg = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        url: request.url,
        method: request.method,
        detail: exception.getResponse(),
        message: (exception.getResponse() as any).message,
        stack: (exception.getResponse() as any).stack,
      };

      this.logger.setContext('HttpException');
      this.logger.error(JSON.stringify(errorMsg));

      response.status(status).json(errorMsg);
    } catch (error) {
      console.log(error);
    }
  }
}
