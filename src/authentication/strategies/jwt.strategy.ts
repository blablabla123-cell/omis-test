import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'prisma/config';
import { JWTPayload } from '../types/jwt-payload.type.js';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: any): Promise<JWTPayload> {
    return { userId: payload.sub };
  }
}
