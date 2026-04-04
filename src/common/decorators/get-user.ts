import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../generated/prisma/client.js';

export const GetUser = createParamDecorator<string>(
  (data: string, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
