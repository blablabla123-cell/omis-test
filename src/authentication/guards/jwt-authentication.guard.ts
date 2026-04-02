import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvalidCredentialsException } from '../../exceptions/index.js';

@Injectable()
export class JWTAuthenticationGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err || !user) {
      throw new InvalidCredentialsException();
    }

    return user;
  }

  constructor() {
    super();
  }
}
