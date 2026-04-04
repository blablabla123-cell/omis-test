import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response, Request } from 'express';
import { APIResponseStatus } from '../enums/api-response-status.enum.js';
import { ErrorAPIResponse } from '../types/error-api-response.type.js';
import { Prisma } from '../../generated/prisma/client.js';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(private readonly logger: LoggerService) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const data: ErrorAPIResponse = {
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      data.statusCode = exception.getStatus();
      data.error = exception.getResponse();
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      data.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      data.error = exception.message;
    } else if (exception instanceof Error) {
      data.error = exception.message;
    }

    const apiResponse = {
      status: APIResponseStatus.FAILURE,
      data,
    };

    this.logger.error(
      JSON.stringify(apiResponse.data.error),
      AllExceptionsFilter.name,
    );

    response.status(data.statusCode).json(apiResponse);
  }
}
