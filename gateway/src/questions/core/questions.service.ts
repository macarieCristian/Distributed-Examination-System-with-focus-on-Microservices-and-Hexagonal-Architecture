import { Injectable } from '@nestjs/common';
import { Question } from '../../domain/question.entity';
import { QuestionsRemoteService } from '../port/outgoing/questions-remote.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionsRemoteService: QuestionsRemoteService) {
  }

  async getAllQuestionsByUser(userUuid: string): Promise<Question[]> {
    return await this.questionsRemoteService.getAllQuestionsByUser(userUuid);
  }

  async createQuestion(userUuid: string, question: Question): Promise<void> {
    await this.questionsRemoteService.createQuestion(userUuid, question);
  }

}
