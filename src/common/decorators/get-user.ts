import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTPayload } from '../../authentication/types/jwt-payload.type.js';

export const GetUser = createParamDecorator(
  (_: undefined, context: ExecutionContext): JWTPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user as JWTPayload;
  },
);
