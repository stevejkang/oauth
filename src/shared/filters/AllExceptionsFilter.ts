import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IS_PRODUCTION } from '../../config';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const stack = exception instanceof Error ? exception.stack : exception as string;
    const message = exception instanceof Error ? exception.message : exception;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      error: {
        message: message,
        stack: this.needToShowStack() && stack
          ? stack
              .toString()
              .split('\n')
              .map(line => line.trim())
          : [],
      },
      result: {},
    };

    if (exception instanceof HttpException) {
      responseBody.result = exception.getResponse();
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private needToShowStack() {
    return !IS_PRODUCTION;
  }
}
