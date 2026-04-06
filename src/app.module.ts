import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module.js';
import { DatabaseModule } from './database/database.module.js';
import { PerfomanceModule } from './perfomance/perfomance.module.js';
import { UsersModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { MetricsModule } from './metrics/metrics.module.js';
import { LoggerModule } from './logger/logger.module.js';
import { LoggerMiddleware } from './common/middlewares/logger.middleware.js';
import { MetricsController } from './metrics/metrics.controller.js';
import { PerfomanceController } from './perfomance/perfomance.controller.js';
import { UsersController } from './users/users.controller.js';
import { AuthenticationController } from './authentication/authentication.controller.js';
@Module({
  imports: [
    DatabaseModule,
    AuthenticationModule,
    PerfomanceModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MetricsModule,
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        MetricsController,
        PerfomanceController,
        UsersController,
        AuthenticationController,
      );
  }
}
