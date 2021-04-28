import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketSessionsService } from '../../core/websocket-sessions.service';
import { WebsocketDtoOut } from './dto/websocket-dto-out';
import { WebsocketChannel } from '../../../domain/enum/websocket-channel';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly sessionsService: WebsocketSessionsService) {
  }

  broadcastMessage<T>(channel: WebsocketChannel, message: WebsocketDtoOut<T>) {
    this.server.emit(channel, message);
  }

  sendMessageToUser<T>(userUuid: string, channel: WebsocketChannel, message: WebsocketDtoOut<T>) {
    this.sessionsService.getSessions(userUuid).forEach(sId =>
      this.server.to(sId).emit(channel, message));
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log('connected  - ' + client.id);
    this.sessionsService.addSession(client.handshake?.query?.userUuid, client.id);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('disconnected - ' + client.id);
    this.sessionsService.removeSession(client.handshake?.query?.userUuid, client.id);
  }

  disconnectUserSockets(userUuid: string) {
    this.sessionsService.getSessions(userUuid).forEach(sId =>
      this.server.sockets?.sockets[sId]?.disconnect(true));
  }
}
