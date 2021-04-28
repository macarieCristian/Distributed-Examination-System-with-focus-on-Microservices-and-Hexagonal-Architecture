import {Injectable} from '@angular/core';
import {AppState} from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {selectAuthCurrentUser} from '../../store/app.selectors';
import {take, tap} from 'rxjs/operators';
import * as io from 'socket.io-client';
import {environment} from '../../../environments/environment';
import {WebsocketEvent} from '../../models/enum/websocket-event';
import {UserRole} from '../../models/enum/user-role.enum';
import {WebsocketChannel} from '../../models/enum/websocket-channel';
import {WebsocketDtoIn} from '../../dtos/websocket-dto-in';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  questions = new Subject<WebsocketDtoIn<any>>();
  exams = new Subject<WebsocketDtoIn<any>>();
  examsAnswers = new Subject<WebsocketDtoIn<any>>();
  private socket: SocketIOClient.Socket;
  isConnected = false;

  constructor(private store: Store<AppState>) {
  }

  connect(): void {
    this.store.select(selectAuthCurrentUser).pipe(
      take(1),
      tap(currentUser => {
        if (UserRole.ADMIN === currentUser?.role) {
          this.establishConnectionAndSubscriptions(currentUser.uuid);
        }
      })).subscribe();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = null;
  }

  private establishConnectionAndSubscriptions(userUuid: string): void {
    if (this.isConnected) {
      return;
    }
    this.socket = io(environment.baseUrl, {reconnectionAttempts: 5, query: {userUuid}});
    this.socket.on(WebsocketEvent.CONNECT, () => {
      this.isConnected = true;
      console.log(WebsocketEvent.CONNECT);
    });
    this.socket.on(WebsocketChannel.QUESTIONS, (websocketDtoIn: WebsocketDtoIn<any>) => {
      this.questions.next(websocketDtoIn);
    });
    this.socket.on(WebsocketChannel.EXAMS, (websocketDtoIn: WebsocketDtoIn<any>) => {
      this.exams.next(websocketDtoIn);
    });
    this.socket.on(WebsocketChannel.EXAMS_ANSWERS, (websocketDtoIn: WebsocketDtoIn<any>) => {
      this.examsAnswers.next(websocketDtoIn);
    });
    this.socket.on(WebsocketEvent.EXCEPTION, (error) => {
      console.log(`${error} ${WebsocketEvent.EXCEPTION}`);
    });
    this.socket.on(WebsocketEvent.DISCONNECT, () => {
      this.isConnected = false;
      console.log(WebsocketEvent.DISCONNECT);
    });
  }
}
