import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller.js';
import { AuthenticationService } from './authentication.service.js';
import { UsersModule } from '../users/users.module.js';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'prisma/config';
import { AuthenticationUtils } from './authentication.utils.js';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: env('JWT_ACCESS_SECRET'),
      signOptions: {
        expiresIn: 60 * 60 * 24 * 30,
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AuthenticationUtils],
})
export class AuthenticationModule {}
