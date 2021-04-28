import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthService } from '../../auth/core/auth.service';
import { INestApplicationContext } from '@nestjs/common';
import SocketIO from 'socket.io';
import { UserRole } from '../../domain/enum/user-role.enum';
import { parse } from 'cookie';

export class AuthenticatedSocketIoAdapter extends IoAdapter {
  private readonly authService: AuthService;

  constructor(private app: INestApplicationContext) {
    super(app);
    this.authService = this.app.get(AuthService);
  }

  createIOServer(port: number, options?: SocketIO.ServerOptions): any {
    options.allowRequest = async (request, allowFunction) => {
      const authorized = await this.check(parse(request?.headers?.cookie || '').jwt, [UserRole.ADMIN]);
      if (!authorized) {
        return allowFunction('4', false);
      }

      return allowFunction(null, true);
    };


    return super.createIOServer(port, options);
  }

  async check(token: string, acceptedRoles: UserRole[]): Promise<boolean> {
    if (!token) {
      return false;
    }
    try {
      await this.authService.authorize(token, acceptedRoles || []);
      return !!await this.authService.authorize(token, acceptedRoles || []);
    } catch (err) {
      return false;
    }
  }
}


