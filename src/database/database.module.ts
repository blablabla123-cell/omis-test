import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service.js';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [DiscoveryModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
