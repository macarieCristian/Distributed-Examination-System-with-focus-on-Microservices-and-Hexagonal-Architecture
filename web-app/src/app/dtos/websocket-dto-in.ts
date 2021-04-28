import {WebsocketMessageType} from '../models/enum/websocket-message-type';

export interface WebsocketDtoIn<T> {
  type: WebsocketMessageType;
  payload: T;
}
