import { Injectable } from '@nestjs/common';
import { AuthRemoteService } from '../port/outgoing/auth-remote.service';
import { User } from '../../domain/user.entity';
import { UserRole } from '../../domain/enum/user-role.enum';

@Injectable()
export class AuthService {
  constructor(private readonly authRemoteService: AuthRemoteService) {
  }

  async login(email: string, password: string): Promise<string> {
    return await this.authRemoteService.login(email, password);
  }

  async authorize(token: string, acceptedRoles: UserRole[]): Promise<User & { exp: number }> {
    return await this.authRemoteService.authorize(token, acceptedRoles);
  }
}
