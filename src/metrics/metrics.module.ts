import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller.js';
import { MetricsService } from './metrics.service.js';
import { PerfomanceService } from '../perfomance/perfomance.service.js';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthenticationGuard } from '../authentication/guards/index.js';
import { RolesGuard } from '../common/index.js';

@Module({
  controllers: [MetricsController],
  providers: [
    MetricsService,
    PerfomanceService,
    {
      provide: APP_GUARD,
      useClass: JWTAuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class MetricsModule {}
