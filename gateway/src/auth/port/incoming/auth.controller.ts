import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginDtoIn } from './dto/login/login-dto-in';
import { AuthService } from '../../core/auth.service';
import { AuthorizationGuard } from '../../guards/authorization.guard';
import { WebsocketGateway } from '../../../shared/port/outgoing/websocket.gateway';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly websocketGateway: WebsocketGateway) {
  }

  @Post('login')
  async login(@Body() body: LoginDtoIn, @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.login(body.email, body.password);
    response.cookie('jwt', token, { httpOnly: true });
    response.status(HttpStatus.NO_CONTENT);
  }

  @UseGuards(AuthorizationGuard)
  @Post('logout')
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    response.status(HttpStatus.NO_CONTENT);
    this.websocketGateway.disconnectUserSockets(request['user'].uuid);
  }
}
