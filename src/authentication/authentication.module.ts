import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller.js';
import { AuthenticationService } from './authentication.service.js';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy.js';
import { AuthenticationUtils } from './authentication.utils.js';
import 'dotenv/config';
import { DatabaseModule } from '../database/database.module.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: 60 * 60 * 24 * 30,
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    AuthenticationUtils,
    LocalStrategy,
  ],
})
export class AuthenticationModule {}
