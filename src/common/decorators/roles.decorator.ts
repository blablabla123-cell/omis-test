import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../generated/prisma/enums.js';
import { Reflector } from '@nestjs/core';

// export const ROLES_KEY = 'roles';
// export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
export const Roles = Reflector.createDecorator<UserRole[]>();
