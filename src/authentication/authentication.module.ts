import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller.js';
import { AuthenticationService } from './authentication.service.js';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy.js';
import { AuthenticationUtils } from './authentication.utils.js';
import 'dotenv/config';
import { DatabaseModule } from '../database/database.module.js';
import { UsersModule } from '../users/users.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: function (configService: ConfigService) {
        const jwtSecret = configService.get<string>('JWT_ACCESS_SECRET');
        return {
          global: true,
          secret: jwtSecret,
          signOptions: {
            expiresIn: 60 * 60 * 24 * 30, // 30 days
          },
        };
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationUtils, LocalStrategy],
})
export class AuthenticationModule {}
