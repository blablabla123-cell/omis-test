import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module.js';
import { DatabaseModule } from './database/database.module.js';
import { PerfomanceModule } from './perfomance/perfomance.module.js';
import { UsersModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service.js';
import { MetricsModule } from './metrics/metrics.module.js';
import { LoggerModule } from './logger/logger.module.js';

@Module({
  imports: [
    DatabaseModule,
    AuthenticationModule,
    PerfomanceModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MetricsModule,
    LoggerModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {}
