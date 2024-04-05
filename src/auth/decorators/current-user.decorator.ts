import { UserEntity } from 'src/database/entities/user.entity';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const getCurrentUserByContext = (context: ExecutionContext): UserEntity => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
};

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) =>
  getCurrentUserByContext(context),
);
