import { Injectable } from '@nestjs/common';
import { UsersRemoteService } from '../port/outgoing/users-remote.service';


@Injectable()
export class UsersService {
  constructor(private readonly usersRemoteService: UsersRemoteService) {
  }

  async create(name: string, email: string, password: string): Promise<void> {
    await this.usersRemoteService.createUser(email, name, password);
  }
}
