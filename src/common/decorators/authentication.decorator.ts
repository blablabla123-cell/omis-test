import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '../../generated/prisma/enums.js';
import { JWTAuthenticationGuard } from '../guards/jwt-authentication.guard.js';
import { RolesGuard } from '../guards/roles.guard.js';
import { Roles } from './roles.decorator.js';
import { ApiResponse } from '@nestjs/swagger';

export function Authentication(roles: UserRole[]) {
  return applyDecorators(
    Roles(roles),
    UseGuards(JWTAuthenticationGuard, RolesGuard),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
  );
}
