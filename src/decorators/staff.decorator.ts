import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom decorator to get the user from the request object
 * @param data
 * @param ctx
 */
export const Staff = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const staff = request.user;

    return data ? staff?.[data] : staff;
  },
);
