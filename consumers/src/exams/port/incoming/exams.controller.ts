import { Controller } from '@nestjs/common';
import { ExamsService } from '../../core/exams.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Events } from '../../../domain/enums/events.enum';
import { Commands } from '../../../domain/enums/commands.enum';
import { HandleGetAllUserExamAnswersByOwnerDto } from './dto/handle-get-all-user-exam-answers-by-owner/handle-get-all-user-exam-answers-by-owner-dto';
import { HandleExamAnswerCreateDtoIn } from './dto/handle-exam-answer-create/handle-exam-answer-create-dto-in';

@Controller()
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {
  }

  @EventPattern(Events.CREATE_EXAM_ANSWER)
  async handleExamAnswerCreate({ providerExamAnswer, submittedExamAnswer }: HandleExamAnswerCreateDtoIn) {
    await this.examsService.createOrUpdateExamAnswer(
      submittedExamAnswer,
      providerExamAnswer
    );
  }

  @MessagePattern({ cmd: Commands.GET_ALL_USER_EXAM_ANSWERS_BY_OWNER })
  async handleGetAllUserExamAnswersByOwner(@Payload() ownerUuid: string): Promise<HandleGetAllUserExamAnswersByOwnerDto[]> {
    return await this.examsService.getAllUserExamAnswersByOwner(ownerUuid);
  }
}
