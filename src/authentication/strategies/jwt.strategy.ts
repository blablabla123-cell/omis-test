import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service.js';
import { User } from '../../generated/prisma/client.js';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from '../../common/interfaces/env-variables.interface.js';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService<EnvVariables>,
  ) {
    const jwtSecret = configService.get('jwt', { infer: true });

    if (!jwtSecret) {
      throw new Error(
        'JWT_ACCESS_SECRET is not defined in environment variables',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any): Promise<User | null> {
    const user = await this.usersService.getUserById(payload.userId);
    return user;
  }
}
