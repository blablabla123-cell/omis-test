import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { DatabaseModule } from '../database/database.module.js';
import { DatabaseService } from '../database/database.service.js';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, DatabaseService],
  exports: [UsersService],
})
export class UsersModule {}
