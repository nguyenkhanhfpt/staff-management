import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Get current staff from GraphQL context
 * Usage: @GraphStaff() staff: JwtPayload
 * Usage with property: @GraphStaff('id') staffId: string
 */
export const GraphStaff = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const staff = ctx.getContext().req?.user;

    return data ? staff?.[data] : staff;
  },
);
