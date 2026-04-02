import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTPayload } from '../../authentication/types/jwt-payload.type.js';
import { User } from '../../generated/prisma/client.js';

export const GetUser = createParamDecorator(
  (_: undefined, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();

    return request.user as User;
  },
);
