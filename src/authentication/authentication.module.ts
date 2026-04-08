import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller.js';
import { AuthenticationService } from './authentication.service.js';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy.js';
import { AuthenticationUtils } from './authentication.utils.js';
import { DatabaseModule } from '../database/database.module.js';
import { UsersModule } from '../users/users.module.js';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from '../common/interfaces/env-variables.interface.js';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: function (configService: ConfigService<EnvVariables>) {
        const jwtSecret = configService.get('jwt', { infer: true });
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
