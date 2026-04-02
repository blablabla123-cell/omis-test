import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { User } from '../generated/prisma/client.js';
import { AuthenticationDto } from '../authentication/dtos/authentication.dto.js';
import { APIResponse, APIResponseStatus } from '../common/index.js';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) { }

  async getUserById(userId: string): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: { id: userId, deletedAt: null },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: { email, deletedAt: null },
    });
  }

  async createUser(dto: AuthenticationDto): Promise<User> {
    return this.databaseService.user.create({ data: dto });
  }

  async deleteUserById(userId: string): Promise<APIResponse<User>> {
    const user = await this.databaseService.user.update({
      where: { id: userId },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      status: APIResponseStatus.SUCCESS,
      message: 'User deleted successfully',
      data: user,
    };
  }
}
