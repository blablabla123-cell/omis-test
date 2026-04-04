import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service.js';
import { AuthenticationDto } from './dtos/authentication.dto.js';
import { APIResponse } from '../common/index.js';
import { AuthenticationResponse } from './types/authentication-response.type.js';
import { LocalAuthenticationGuard } from '../common/guards/local-authentication.guard.js';
import { ApiResponse } from '@nestjs/swagger';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthenticationGuard)
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully authenticated',
  })
  @ApiResponse({
    status: 404,
    description: 'The user was not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Request() req: any,
  ): Promise<APIResponse<AuthenticationResponse>> {
    return this.authenticationService.signIn(req.user);
  }

  @ApiResponse({
    status: 200,
    description: 'The user has been successfully authenticated',
  })
  @ApiResponse({
    status: 404,
    description: 'The user was not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 409,
    description: 'The user already exists',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(
    @Body() dto: AuthenticationDto,
  ): Promise<APIResponse<AuthenticationResponse>> {
    return this.authenticationService.signUp(dto);
  }
}
