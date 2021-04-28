import { Inject, Injectable } from '@nestjs/common';
import { Service } from '../../../domain/enum/service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { User } from '../../../domain/user.entity';
import { Commands } from '../../../domain/enum/commands.enum';
import { ExceptionCode } from '../../../domain/enum/exception-code.enum';
import { ExceptionValueObject } from '../../../domain/exception-value-object';

@Injectable()
export class UsersRemoteService {
  constructor(@Inject(Service.USERS) private readonly remoteUsersClient: ClientProxy) {
  }

  private static handleError(err): void {
    const errorCode = err.code || ExceptionCode.INTERNAL_SERVER;
    switch (errorCode) {
      case ExceptionCode.NOT_FOUND:
        throw new RpcException(new ExceptionValueObject(ExceptionCode.NOT_FOUND, err.message));
      default:
        throw new RpcException(new ExceptionValueObject(ExceptionCode.INTERNAL_SERVER, `[UsersService-failed]: ${err.message}`));
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      return await this.remoteUsersClient.send<User>({ cmd: Commands.GET_USER_BY_EMAIL }, email).toPromise();
    } catch (err) {
      UsersRemoteService.handleError(err);
    }
  }
}
