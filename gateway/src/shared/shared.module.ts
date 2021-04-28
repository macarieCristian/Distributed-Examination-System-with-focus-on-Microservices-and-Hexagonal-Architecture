import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Service } from '../domain/enum/service';
import { CSRFExceptionFilter } from './filters/csrf-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { SharedController } from './port/incoming/shared.controller';
import { WebsocketGateway } from './port/outgoing/websocket.gateway';
import { WebsocketSessionsService } from './core/websocket-sessions.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: Service.AUTH,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 9020,
        },
      },
      {
        name: Service.USERS,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 9030,
        },
      },
      {
        name: Service.PROVIDERS,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 9040,
        },
      },
      {
        name: Service.CONSUMERS,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
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
  ],
  exports: [
    ClientsModule,
    WebsocketGateway,
  ],
})
export class SharedModule {
}
