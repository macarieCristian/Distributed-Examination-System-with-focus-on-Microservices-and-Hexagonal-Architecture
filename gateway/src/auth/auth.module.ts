import { Global, Module } from '@nestjs/common';
import { AuthRemoteService } from './port/outgoing/auth-remote.service';
import { AuthController } from './port/incoming/auth.controller';
import { AuthService } from './core/auth.service';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthRemoteService, AuthService],
  exports: [AuthService],
})
export class AuthModule {
}
