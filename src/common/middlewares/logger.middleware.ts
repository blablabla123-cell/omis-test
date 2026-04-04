import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service.js';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.loggerService.log(`Incoming request: ${req.method} ${req.host} ${req.originalUrl}`);
    next();
  }
}
