import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { WebsocketGateway } from '../../../shared/port/outgoing/websocket.gateway';
import { WebsocketChannel } from '../../../domain/enum/websocket-channel';
import { WebsocketMessageType } from '../../../domain/enum/websocket-message-type';
import { ConsumersEvents } from '../../../domain/enum/consumers-events.enum';
import { HandleExamAnswerCreateSuccessDto } from './dto/handle-exam-answer-create-success/handle-exam-answer-create-success-dto';

@Controller()
export class ExamAnswersConsumersController {
  constructor(private readonly websocketGateway: WebsocketGateway) {
  }

  @EventPattern(ConsumersEvents.CREATE_EXAM_ANSWER_SUCCESS)
  async handleExamAnswerCreateSuccess(handleExamAnswerCreateSuccessDto: HandleExamAnswerCreateSuccessDto) {
    this.websocketGateway.sendMessageToUser<HandleExamAnswerCreateSuccessDto>(
      handleExamAnswerCreateSuccessDto.ownerUuid,
      WebsocketChannel.EXAMS_ANSWERS,
      {
        type: WebsocketMessageType.EXAMS_ANSWERS_ADD_SUCCESS,
        payload: handleExamAnswerCreateSuccessDto,
      },
    );
  }
}
