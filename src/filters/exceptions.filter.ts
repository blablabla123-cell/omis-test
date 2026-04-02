import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response, Request } from 'express';

import { LoggerService } from '../logger/logger.service.js';
import { APIResponseStatus, ErrorAPIResponse } from '../common/index.js';
import { Prisma } from '../generated/prisma/client.js';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new LoggerService();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseObject: ErrorAPIResponse = {
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      responseObject.statusCode = exception.getStatus();
      responseObject.error = exception.getResponse();
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      responseObject.statusCode = 422;
      responseObject.error = exception.message.replace(/\n/g, '');
    } else if (exception instanceof Error) {
      responseObject.error = exception.message;
    }

    const apiResponse = {
      status: APIResponseStatus.FAILURE,
      data: responseObject,
    };

    this.logger.error(
      JSON.stringify(apiResponse.data.error),
      ExceptionsFilter.name,
    );

    response.status(responseObject.statusCode).json(apiResponse);
  }
}
