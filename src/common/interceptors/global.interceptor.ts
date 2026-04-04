import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  tap,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';
import { LoggerService } from '../../logger/logger.service.js';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    this.loggerService.log('Before request is handled');

    const now = Date.now();
    return next.handle().pipe(
      timeout(5 * 1000),
      tap(() =>
        this.loggerService.log(
          `After request is handled, duration: ${Date.now() - now} ms`,
        ),
      ),
      catchError((error) => {
        this.loggerService.error(error.message, error.stack);
        if (error instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => error);
      }),
    );
  }
}
