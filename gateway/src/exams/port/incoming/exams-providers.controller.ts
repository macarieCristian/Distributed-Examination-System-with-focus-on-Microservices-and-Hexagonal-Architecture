import { Controller } from '@nestjs/common';
import { ProvidersEvents } from '../../../domain/enum/providers-events.enum';
import { EventPattern } from '@nestjs/microservices';
import { WebsocketGateway } from '../../../shared/port/outgoing/websocket.gateway';
import { WebsocketChannel } from '../../../domain/enum/websocket-channel';
import { WebsocketMessageType } from '../../../domain/enum/websocket-message-type';
import { HandleExamCreateSuccessDtoIn } from './dto/handle-exam-create-success/handle-exam-create-success-dto-in';
import { Exam } from '../../../domain/exam.entity';

@Controller()
export class ExamsProvidersController {
  constructor(private readonly websocketGateway: WebsocketGateway) {
  }

  @EventPattern(ProvidersEvents.CREATE_EXAM_SUCCESS)
  async handleExamCreateSuccess(handleExamCreateSuccessDtoIn: HandleExamCreateSuccessDtoIn) {
    this.websocketGateway.sendMessageToUser<Exam>(
      handleExamCreateSuccessDtoIn.userUuid,
      WebsocketChannel.EXAMS,
      {
        type: WebsocketMessageType.EXAM_ADD_SUCCESS,
        payload: handleExamCreateSuccessDtoIn.exam,
      },
    );
  }


}
