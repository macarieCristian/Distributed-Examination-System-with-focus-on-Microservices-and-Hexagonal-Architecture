import { Injectable } from '@nestjs/common';
import { CreateExamAnswerDto } from '../port/incoming/dto/create-exam-answer/create-exam-answer-dto';
import { ConsumersRemoteService } from '../port/outgoing/consumers-remote.service';

@Injectable()
export class ConsumersService {
  constructor(private readonly consumersRemoteService: ConsumersRemoteService) {
  }

  async createExamAnswer(createExamAnswerDtoIn: CreateExamAnswerDto) {
    await this.consumersRemoteService.createExamAnswer(createExamAnswerDtoIn);
  }

  async getAllUserExamAnswersByOwner(uuid: string) {
    return await this.consumersRemoteService.getAllUserExamAnswersByOwner(uuid);
  }
}
