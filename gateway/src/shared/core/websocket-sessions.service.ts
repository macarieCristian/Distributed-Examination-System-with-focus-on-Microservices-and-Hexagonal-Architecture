import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';

@Injectable()
export class WebsocketSessionsService {
  private userSessions: { [userUuid: string]: string[] } = {};

  addSession(userUuid: string, sessionId: string): void {
    if (!userUuid) {
      return;
    }
    this.userSessions[userUuid] = [...(this.userSessions[userUuid] || []), sessionId];
  }

  removeSession(userUuid: string, sessionId: string): void {
    if (!userUuid) {
      return;
    }
    let userSessions = this.userSessions[userUuid];
    if (userSessions) {
      userSessions = userSessions.filter(sId => sId !== sessionId);
      if (isEmpty(userSessions)) {
        delete this.userSessions[userUuid];
      } else {
        this.userSessions[userUuid] = userSessions;
      }
    }
  }

  getSessions(userUuid: string): string[] {
    return this.userSessions[userUuid] || [];
  }
}
