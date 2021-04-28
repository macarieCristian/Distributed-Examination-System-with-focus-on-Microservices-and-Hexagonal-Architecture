import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from '../../core/auth.service';
import { Ctx, MessagePattern, Payload, TcpContext } from '@nestjs/microservices';
import { Commands } from '../../../domain/enum/commands.enum';
import { AuthenticationGuard } from '../../guards/authentication.guard';
import { AuthorizeDtoIn } from './dto/authorize-dto-in';
import { AuthorizeDtoOut } from './dto/authorize-dto-out';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(AuthenticationGuard)
  @MessagePattern({ cmd: Commands.LOGIN })
  async login(@Ctx() context: TcpContext): Promise<string> {
    return await this.authService.login(context['user']);
  }

  @MessagePattern({ cmd: Commands.AUTHORIZE })
  async authorize(@Payload() authorizeDtoIn: AuthorizeDtoIn): Promise<AuthorizeDtoOut> {
    return await this.authService.authorize(authorizeDtoIn.token, authorizeDtoIn.acceptedRoles);
  }
}
