import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAt = createParamDecorator(
  (_data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.cookie.accessToken === 'Admin';
  },
);
