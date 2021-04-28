import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Service } from '../../../domain/enum/service';
import { ClientProxy } from '@nestjs/microservices';
import { Commands } from '../../../domain/enum/commands.enum';
import { ExceptionCode } from '../../../domain/enum/exception-code.enum';

@Injectable()
export class UsersRemoteService {
  constructor(@Inject(Service.USERS) private readonly remoteUsersClient: ClientProxy) {
  }

  private static handleError(err): void {
    const errorCode = err.code || ExceptionCode.INTERNAL_SERVER;
    switch (errorCode) {
      case ExceptionCode.NOT_FOUND:
        throw new NotFoundException(err.message);
      default:
        throw new InternalServerErrorException(`[UsersService-failed]: ${err.message}`);
    }
  }

  async createUser(email: string, name: string, password: string): Promise<void> {
    try {
      await this.remoteUsersClient.send({ cmd: Commands.CREATE_USER }, { email, name, password }).toPromise();
    } catch (err) {
      UsersRemoteService.handleError(err);
    }
  }
}
