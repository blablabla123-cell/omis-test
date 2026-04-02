import { Module } from '@nestjs/common';
import { PerfomanceService } from './perfomance.service.js';
import { PerfomanceController } from './perfomance.controller.js';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard.js';

@Module({
  controllers: [PerfomanceController],
  providers: [
    PerfomanceService,
    {
      provide: APP_GUARD,
      useClass: JWTAuthenticationGuard,
    },
  ],
})
export class PerfomanceModule {}
