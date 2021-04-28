import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Events } from '../../../domain/enum/events.enum';
import { ExamsService } from '../../core/exams.service';
import { HandleExamCreateDtoIn } from './dto/handle-exam-create/handle-exam-create-dto-in';
import { Exam } from '../../../domain/exam.entity';
import { Commands } from '../../../domain/enum/commands.enum';
import { ExamHeaderDtoOut } from './dto/handle-get-consumer-available-exams-header/exam-header-dto-out';
import { ExamDtoOut } from './dto/handle-get-all-questions-by-user/exam-dto-out';
import { HandleGetConsumerAvailableExamDtoOut } from './dto/handle-get-consumer-available-exam/handle-get-consumer-available-exam-dto-out';

@Controller()
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {
  }

  @MessagePattern({ cmd: Commands.GET_EXAMS_BY_USER })
  async handleGetAllQuestionsByUser(@Payload() userUuid: string): Promise<ExamDtoOut[]> {
    return await this.examsService.getAllExamsByUser(userUuid);
  }

  @MessagePattern({ cmd: Commands.GET_CONSUMER_AVAILABLE_EXAMS_HEADER })
  async handleGetConsumerAvailableExamsHeader(): Promise<ExamHeaderDtoOut[]> {
    return await this.examsService.getConsumerAvailableExamsHeader();
  }

  @MessagePattern({ cmd: Commands.GET_CONSUMER_AVAILABLE_EXAM })
  async handleGetConsumerAvailableExam(@Payload() examUuid: string): Promise<HandleGetConsumerAvailableExamDtoOut> {
    const { examQuestions, ...exam } = await this.examsService.getConsumerAvailableExam(examUuid);
    return {
      ...exam,
      questions: (examQuestions || []).map(examQuestion => examQuestion.question),
    };
  }

  @EventPattern(Events.CREATE_EXAM)
  async handleExamCreate(handleExamCreateDtoIn: HandleExamCreateDtoIn) {
    await this.examsService.createExam(
      handleExamCreateDtoIn.userUuid,
      handleExamCreateDtoIn.exam as Exam,
    );
  }
}
