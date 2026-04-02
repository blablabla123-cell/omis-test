import { Module } from '@nestjs/common';
import { PerfomanceService } from './perfomance.service.js';
import { PerfomanceController } from './perfomance.controller.js';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthenticationGuard } from '../authentication/guards/index.js';
import { RolesGuard } from '../common/index.js';
import { DatabaseModule } from '../database/database.module.js';
import { DatabaseService } from '../database/database.service.js';
import { JWTStrategy } from '../authentication/strategies/index.js';
import { UsersService } from '../users/users.service.js';
import { PerfomanceUtils } from './perfomance.utils.js';

@Module({
  imports: [DatabaseModule],
  controllers: [PerfomanceController],
  providers: [
    DatabaseService,
    UsersService,
    JWTStrategy,
    PerfomanceService,
    PerfomanceUtils,
  ],
})
export class PerfomanceModule {}
