import { Controller } from '@nestjs/common';
import { ProvidersEvents } from '../../../domain/enum/providers-events.enum';
import { EventPattern } from '@nestjs/microservices';
import { QuestionDtoIn } from './dto/handle-question-create-success/question-dto-in';
import { WebsocketGateway } from '../../../shared/port/outgoing/websocket.gateway';
import { Question } from '../../../domain/question.entity';
import { WebsocketChannel } from '../../../domain/enum/websocket-channel';
import { WebsocketMessageType } from '../../../domain/enum/websocket-message-type';

@Controller()
export class QuestionsProvidersController {
  constructor(private readonly websocketGateway: WebsocketGateway) {
  }

  @EventPattern(ProvidersEvents.CREATE_QUESTION_SUCCESS)
  async handleQuestionCreateSuccess(questionDtoIn: QuestionDtoIn) {
    this.websocketGateway.sendMessageToUser<Question>(
      questionDtoIn.userUuid,
      WebsocketChannel.QUESTIONS,
      {
        type: WebsocketMessageType.QUESTION_ADD_SUCCESS,
        payload: questionDtoIn.question,
      },
    );
  }


}
