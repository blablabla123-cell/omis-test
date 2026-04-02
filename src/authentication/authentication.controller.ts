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
import { LocalAuthenticationGuard } from './guards/local-authentication.guard.js';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @UseGuards(LocalAuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Request() req: any,
  ): Promise<APIResponse<AuthenticationResponse>> {
    return this.authenticationService.signIn(req.user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(
    @Body() dto: AuthenticationDto,
  ): Promise<APIResponse<AuthenticationResponse>> {
    return this.authenticationService.signUp(dto);
  }
}
