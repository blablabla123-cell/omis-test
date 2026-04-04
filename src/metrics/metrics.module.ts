import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller.js';
import { MetricsService } from './metrics.service.js';
import { DatabaseService } from '../database/database.service.js';
import { JWTStrategy } from '../authentication/strategies/index.js';
import { UsersService } from '../users/users.service.js';
import { DatabaseModule } from '../database/database.module.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [MetricsController],
  providers: [MetricsService, JWTStrategy],
})
export class MetricsModule {}
