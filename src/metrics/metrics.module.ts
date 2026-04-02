import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller.js';
import { MetricsService } from './metrics.service.js';
import { PerfomanceService } from '../perfomance/perfomance.service.js';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthenticationGuard } from '../authentication/guards/index.js';
import { RolesGuard } from '../common/index.js';
import { DatabaseModule } from '../database/database.module.js';
import { DatabaseService } from '../database/database.service.js';
import { JWTStrategy } from '../authentication/strategies/index.js';
import { UsersService } from '../users/users.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [MetricsController],
  providers: [DatabaseService, UsersService, MetricsService, JWTStrategy],
})
export class MetricsModule {}
