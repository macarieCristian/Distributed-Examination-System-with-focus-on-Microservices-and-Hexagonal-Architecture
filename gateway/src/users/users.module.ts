import { Module } from '@nestjs/common';
import { UsersController } from './port/incoming/users.controller';
import { UsersService } from './core/users.service';
import { UsersRemoteService } from './port/outgoing/users-remote.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRemoteService]
})
export class UsersModule {}
