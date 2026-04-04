import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  APIResponse,
  Authentication,
  Roles,
  RolesGuard,
} from '../common/index.js';
import { User, UserRole } from '../generated/prisma/client.js';
import { UsersService } from './users.service.js';
import { JWTAuthenticationGuard } from '../common/guards/jwt-authentication.guard.js';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
@Authentication(UserRole.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete(':id')
  async deleteUserById(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: string,
  ): Promise<APIResponse<User>> {
    return this.usersService.deleteUserById(id);
  }
}
