import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '../../domain/user.entity';
import { AuthService } from '../core/auth.service';
import { Request } from 'express';
import { UserRole } from '../../domain/enum/user-role.enum';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly authService: AuthService,
              private reflector: Reflector) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const acceptedRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    req['user'] = await this.check(req?.cookies?.jwt, acceptedRoles);
    return true;
  }

  async check(token: string, acceptedRoles: UserRole[]): Promise<User & { exp: number }> {
    if (!token) {
      throw new ForbiddenException('Missing token');
    }
    return await this.authService.authorize(token, acceptedRoles || []);
  }
}
