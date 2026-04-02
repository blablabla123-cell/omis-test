import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { AuthenticationUtils } from './authentication.utils.js';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationDto } from './dtos/authentication.dto.js';
import {
  InvalidCredentialsException,
  UserAlreadyExistsException,
  UserNotFoundException,
} from '../exceptions/index.js';
import { APIResponse, APIResponseStatus } from '../common/index.js';
import { AuthenticationResponse } from './types/authentication-response.type.js';
import { JWTPayload } from './types/jwt-payload.type.js';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authenticationUtils: AuthenticationUtils,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    payload: JWTPayload,
  ): Promise<APIResponse<AuthenticationResponse>> {
    const accessToken = await this.jwtService.signAsync({
      payload,
    });

    return {
      status: APIResponseStatus.SUCCESS,
      message: 'User signed in successfully',
      data: { accessToken },
    };
  }

  async signUp(
    dto: AuthenticationDto,
  ): Promise<APIResponse<AuthenticationResponse>> {
    let user = await this.usersService.getUserByEmail(dto.email);

    if (user) {
      throw new UserAlreadyExistsException();
    }

    dto.password = await this.authenticationUtils.hash(dto.password);

    user = await this.usersService.createUser(dto);

    const payload = { sub: user.id };

    const accessToken = await this.jwtService.signAsync({
      payload,
    });

    return {
      status: APIResponseStatus.SUCCESS,
      message: 'User signed up successfully',
      data: { accessToken },
    };
  }

  async validateUser(email: string, password: string): Promise<JWTPayload> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordMatch = await this.authenticationUtils.validate(
      password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new InvalidCredentialsException();
    }

    return {
      userId: user.id,
    };
  }
}
