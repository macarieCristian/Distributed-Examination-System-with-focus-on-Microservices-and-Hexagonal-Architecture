import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { LoginDtoIn } from '../port/incoming/dto/login-dto-in';
import { User } from '../../domain/user.entity';
import { RpcException, TcpContext } from '@nestjs/microservices';
import { AuthService } from '../core/auth.service';
import { ExceptionValueObject } from '../../domain/exception-value-object';
import { ExceptionCode } from '../../domain/enum/exception-code.enum';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx: TcpContext = context.switchToRpc().getContext();
    const loginDtoIn: LoginDtoIn = context.switchToRpc().getData();
    ctx['user'] = await this.validate(loginDtoIn.email, loginDtoIn.password);
    return true;
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new RpcException(new ExceptionValueObject(ExceptionCode.UNAUTHORIZED, 'Invalid credentials'));
    }
    return user;
  }
}
