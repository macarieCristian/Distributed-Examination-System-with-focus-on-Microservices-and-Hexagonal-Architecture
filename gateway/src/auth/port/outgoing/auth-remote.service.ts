import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Service } from '../../../domain/enum/service';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '../../../domain/enum/commands.enum';
import { ExceptionCode } from '../../../domain/enum/exception-code.enum';
import { AuthorizeRemoteDtoIn } from './dto/authorize/authorize-remote-dto-in';
import { UserRole } from '../../../domain/enum/user-role.enum';

@Injectable()
export class AuthRemoteService {
  constructor(@Inject(Service.AUTH) private readonly remoteAuthClient: ClientProxy) {
  }

  private static handleError(err): void {
    const errorCode = err.code || ExceptionCode.INTERNAL_SERVER;
    switch (errorCode) {
      case ExceptionCode.UNAUTHORIZED:
        throw new UnauthorizedException(err.message);
      case ExceptionCode.FORBIDDEN:
        throw new ForbiddenException(err.message);
      default:
        throw new InternalServerErrorException(`[AuthService-failed]: ${err.message}`);
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      return await this.remoteAuthClient.send({ cmd: Commands.LOGIN }, { email, password }).toPromise();
    } catch (err) {
      AuthRemoteService.handleError(err);
    }
  }

  async authorize(token: string, acceptedRoles: UserRole[]): Promise<AuthorizeRemoteDtoIn> {
    try {
      return await this.remoteAuthClient.send({ cmd: Commands.AUTHORIZE }, { token, acceptedRoles }).toPromise();
    } catch (err) {
      AuthRemoteService.handleError(err);
    }
  }
}
