import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { User } from '../src/generated/prisma/client.js';
import { AuthenticationDto } from '../authentication/dtos/authentication.dto.js';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: { email },
    });
  }

  async createUser(dto: AuthenticationDto): Promise<User> {
    return this.databaseService.user.create({ data: dto });
  }
}
