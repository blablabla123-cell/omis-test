import { Module } from '@nestjs/common';
import { PerfomanceService } from './perfomance.service.js';
import { PerfomanceController } from './perfomance.controller.js';
import { DatabaseService } from '../database/database.service.js';
import { JWTStrategy } from '../authentication/strategies/index.js';
import { UsersService } from '../users/users.service.js';
import { PerfomanceUtils } from './perfomance.utils.js';
import { DatabaseModule } from '../database/database.module.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [PerfomanceController],
  providers: [JWTStrategy, PerfomanceService, PerfomanceUtils],
})
export class PerfomanceModule {}
