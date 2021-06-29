import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Service } from '../domain/enum/service';
import { CSRFExceptionFilter } from './filters/csrf-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { SharedController } from './port/incoming/shared.controller';
import { WebsocketGateway } from './port/outgoing/websocket.gateway';
import { WebsocketSessionsService } from './core/websocket-sessions.service';
import { ExamsRemoteService } from '../exams/port/outgoing/exams-remote.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: Service.AUTH,
        transport: Transport.TCP,
        options: {
          host: 'auth',
          port: 9020,
        },
      },
      {
        name: Service.USERS,
        transport: Transport.TCP,
        options: {
          host: 'users',
          port: 9030,
        },
      },
      {
        name: Service.PROVIDERS,
        transport: Transport.TCP,
        options: {
          host: 'providers',
          port: 9040,
        },
      },
      {
        name: Service.CONSUMERS,
        transport: Transport.TCP,
        options: {
          host: 'consumers',
          port: 9050,
        },
      },
    ]),
  ],
  controllers: [SharedController],
  providers: [
    { provide: APP_FILTER, useClass: CSRFExceptionFilter },
    WebsocketGateway,
    WebsocketSessionsService,
    ExamsRemoteService,
  ],
  exports: [
    ClientsModule,
    WebsocketGateway,
    ExamsRemoteService,
  ],
})
export class SharedModule {
}
