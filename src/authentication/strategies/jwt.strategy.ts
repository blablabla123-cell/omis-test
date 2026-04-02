import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'prisma/config';
import { JWTPayload } from '../types/jwt-payload.type.js';
import { UsersService } from '../../users/users.service.js';
import { User } from '../../generated/prisma/client.js';
import { UserNotFoundException } from '../../exceptions/index.js';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: any): Promise<User | null> {
    const user = await this.usersService.getUserById(payload.userId);
    return user;
  }
}