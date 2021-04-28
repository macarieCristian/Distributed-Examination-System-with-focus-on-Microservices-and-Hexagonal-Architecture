import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ExamAnswer } from '../../../domain/exam.entity';
import { Service } from '../../../domain/enums/service';
import { Events } from '../../../domain/enums/events.enum';

@Injectable()
export class ExamsGatewayRemoteService {
  constructor(@Inject(Service.GATEWAY) private readonly remoteGatewayClient: ClientProxy) {
  }

  async signalExamAnswerCreatedSuccessfully(examAnswer: ExamAnswer): Promise<void> {
    this.remoteGatewayClient.emit<Events, ExamAnswer>(Events.CREATE_EXAM_ANSWER_SUCCESS, examAnswer);
  }
}
