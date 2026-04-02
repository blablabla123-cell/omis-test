import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { APIResponse, Roles } from '../common/index.js';
import { User, UserRole } from '../generated/prisma/client.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.ADMIN)
  @Delete()
  async deleteUserById(
    @Param('id') userId: string,
  ): Promise<APIResponse<User>> {
    return this.usersService.deleteUserById(userId);
  }
}
