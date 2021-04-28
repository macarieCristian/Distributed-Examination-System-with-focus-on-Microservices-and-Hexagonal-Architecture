import { WebsocketMessageType } from '../../../../domain/enum/websocket-message-type';

export interface WebsocketDtoOut<T> {
  type: WebsocketMessageType;
  payload: T;
}
