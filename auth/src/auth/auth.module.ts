import { Module } from '@nestjs/common';
import { AuthService } from './core/auth.service';
import { AuthController } from './port/incoming/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth-constants';
import { UsersRemoteService } from './port/outgoing/users-remote.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.availabilityTime },
    }),
  ],
  providers: [AuthService, UsersRemoteService],
  controllers: [AuthController],
})
export class AuthModule {
}
