import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { APIResponse, Roles, RolesGuard } from '../common/index.js';
import { User, UserRole } from '../generated/prisma/client.js';
import { UsersService } from './users.service.js';
import { JWTAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard.js';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Forbidden' })
@Roles(UserRole.ADMIN)
@UseGuards(RolesGuard, JWTAuthenticationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Delete(':id')
  async deleteUserById(
    @Param('id') userId: string,
  ): Promise<APIResponse<User>> {
    return this.usersService.deleteUserById(userId);
  }
}
