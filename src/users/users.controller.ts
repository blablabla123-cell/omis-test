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

@Controller('users')
@UseGuards(RolesGuard, JWTAuthenticationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteUserById(
    @Param('id') userId: string,
  ): Promise<APIResponse<User>> {
    return this.usersService.deleteUserById(userId);
  }
}
