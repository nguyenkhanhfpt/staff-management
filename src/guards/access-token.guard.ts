import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@decorators';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * Get request from context (REST or GraphQL)
   * @param context
   */
  getRequest(context: ExecutionContext) {
    const contextType = context.getType<string>();

    if (contextType === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }

    return context.switchToHttp().getRequest();
  }

  /**
   * canActivate
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    await super.canActivate(context);

    return true;
  }
}
