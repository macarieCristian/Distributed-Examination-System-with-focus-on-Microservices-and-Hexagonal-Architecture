import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from '../../core/users.service';
import { CreateUserDtoIn } from './dto/create-user-dto-in';
import { GetUserByEmailDtoOut } from './dto/get-user-by-email-dto-out';
import { Commands } from '../../../domain/enum/commands.enum';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @MessagePattern({ cmd: Commands.GET_USER_BY_EMAIL })
  async getUserByEmail(email: string): Promise<GetUserByEmailDtoOut> {
    return await this.usersService.findByEmail(email);
  }

  @MessagePattern({ cmd: Commands.CREATE_USER })
  async createUser(createUserDtoIn: CreateUserDtoIn): Promise<void> {
    await this.usersService.create(createUserDtoIn.name, createUserDtoIn.email, createUserDtoIn.password);
  }
}
