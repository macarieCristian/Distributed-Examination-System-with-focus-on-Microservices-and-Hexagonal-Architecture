import { Injectable } from '@nestjs/common';
import { CreateExamAnswerDto } from '../port/incoming/dto/create-exam-answer/create-exam-answer-dto';
import { ConsumersRemoteService } from '../port/outgoing/consumers-remote.service';
import { ExamsRemoteService } from '../../exams/port/outgoing/exams-remote.service';

@Injectable()
export class ConsumersService {
  constructor(private readonly consumersRemoteService: ConsumersRemoteService,
              private readonly examsRemoteService: ExamsRemoteService) {
  }

  async createExamAnswer(createExamAnswerDtoIn: CreateExamAnswerDto) {
    const providerExamAnswer = await this.examsRemoteService.getExamAnswers(createExamAnswerDtoIn.examUuid);
    await this.consumersRemoteService.createExamAnswer(createExamAnswerDtoIn, providerExamAnswer);
  }

  async getAllUserExamAnswersByOwner(uuid: string) {
    return await this.consumersRemoteService.getAllUserExamAnswersByOwner(uuid);
  }
}
