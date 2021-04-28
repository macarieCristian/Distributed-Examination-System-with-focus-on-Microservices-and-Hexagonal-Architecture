import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { RegisterDtoIn } from './dto/register-dto-in';
import { AuthorizationGuard } from '../../../auth/guards/authorization.guard';
import { UsersService } from '../../core/users.service';
import { UserRole } from '../../../domain/enum/user-role.enum';
import { Roles } from '../../../auth/decorator/roles.decorator';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('register')
  async register(@Body() registerDtoIn: RegisterDtoIn) {
    await this.usersService.create(
      registerDtoIn?.name,
      registerDtoIn?.email,
      registerDtoIn?.password,
    );
  }

  @UseGuards(AuthorizationGuard)
  @Get('user')
  async getUser(@Req() request: Request) {
    return request['user'];
  }

  @UseGuards(AuthorizationGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin')
  async getAdmin() {
    return { role: 'admin' };
  }

  @UseGuards(AuthorizationGuard)
  @Roles(UserRole.USER)
  @Get('regular')
  async getUserR() {
    return { role: 'user' };
  }
}
