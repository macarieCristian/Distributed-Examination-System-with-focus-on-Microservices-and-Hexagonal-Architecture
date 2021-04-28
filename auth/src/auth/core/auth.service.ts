import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRemoteService } from '../port/outgoing/users-remote.service';
import { User } from '../../domain/user.entity';
import { TokenValueObject } from '../../domain/token-value-object';
import { RpcException } from '@nestjs/microservices';
import { ExceptionValueObject } from '../../domain/exception-value-object';
import { ExceptionCode } from '../../domain/enum/exception-code.enum';
import { UserRole } from '../../domain/enum/user-role.enum';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthService {
  constructor(private readonly usersRemoteService: UsersRemoteService,
              private readonly jwtService: JwtService) {
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRemoteService.getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User): Promise<string> {
    const payload = {
      email: user.email,
      name: user.name,
      sub: user.uuid,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  async authorize(token: string, acceptedRoles: UserRole[]): Promise<User & { exp: number }> {
    try {
      const payload: TokenValueObject = this.jwtService.verify(token);
      this.checkAcceptedRoles(payload.role, acceptedRoles);
      return {
        uuid: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role,
        exp: payload.exp,
      };
    } catch (err) {
      throw new RpcException(new ExceptionValueObject(ExceptionCode.FORBIDDEN, err.message));
    }
  }

  private checkAcceptedRoles(currentRole: UserRole, acceptedRoles: UserRole[]): void {
    if (!isEmpty(acceptedRoles) && !acceptedRoles.some(role => role === currentRole)) {
      throw new RpcException(new ExceptionValueObject(
        ExceptionCode.FORBIDDEN,
        'You don\'t have the required role in order to access this resource.',
      ));
    }
  }
}
