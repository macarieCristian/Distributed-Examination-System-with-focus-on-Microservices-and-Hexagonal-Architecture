import { Inject, Injectable } from '@nestjs/common';
import { Service } from '../../../domain/enum/service';
import { ClientProxy } from '@nestjs/microservices';
import { Events } from '../../../domain/enum/events.enum';
import { Exam } from '../../../domain/exam.entity';
import { SignalExamCreatedSuccessfullyDtoOut } from './dto/signal-exam-created-successfully/signal-exam-created-successfully-dto-out';

@Injectable()
export class ExamsGatewayRemoteService {
  constructor(@Inject(Service.GATEWAY) private readonly remoteGatewayClient: ClientProxy) {
  }

  async signalExamCreatedSuccessfully(userUuid: string, exam: Exam): Promise<void> {
    this.remoteGatewayClient.emit<Events, SignalExamCreatedSuccessfullyDtoOut>(Events.CREATE_EXAM_SUCCESS, {
      userUuid,
      exam,
    });
  }
}
