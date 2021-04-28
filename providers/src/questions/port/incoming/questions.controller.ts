import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Events } from '../../../domain/enum/events.enum';
import { QuestionsService } from '../../core/questions.service';
import { QuestionDtoIn } from './dto/handle-question-create/question-dto-in';
import { Commands } from '../../../domain/enum/commands.enum';
import { Question } from '../../../domain/question.entity';

@Controller()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {
  }

  @MessagePattern({ cmd: Commands.GET_QUESTIONS_BY_USER })
  async handleGetAllQuestionsByUser(@Payload() userUuid: string): Promise<Question[]> {
    return await this.questionsService.getAllQuestionsByUser(userUuid);
  }

  @EventPattern(Events.CREATE_QUESTION)
  async handleQuestionCreate(questionDtoIn: QuestionDtoIn) {
    await this.questionsService.createQuestion(questionDtoIn.userUuid, questionDtoIn.question);
  }
}
