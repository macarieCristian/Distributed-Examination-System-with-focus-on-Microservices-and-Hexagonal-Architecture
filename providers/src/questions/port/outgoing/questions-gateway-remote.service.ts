import { Inject, Injectable } from '@nestjs/common';
import { Service } from '../../../domain/enum/service';
import { ClientProxy } from '@nestjs/microservices';
import { Question } from '../../../domain/question.entity';
import { Events } from '../../../domain/enum/events.enum';
import { QuestionDtoOut } from './dto/signal-question-created-successfully/question-dto-out';

@Injectable()
export class QuestionsGatewayRemoteService {
  constructor(@Inject(Service.GATEWAY) private readonly remoteGatewayClient: ClientProxy) {
  }

  async signalQuestionCreatedSuccessfully(userUuid: string, question: Question): Promise<void> {
    this.remoteGatewayClient.emit<Events, QuestionDtoOut>(Events.CREATE_QUESTION_SUCCESS, { userUuid, question });
  }
}
