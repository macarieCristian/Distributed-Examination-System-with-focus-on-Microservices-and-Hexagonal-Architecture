import { Injectable } from '@nestjs/common';
import { Question } from '../../domain/question.entity';
import { QuestionsGatewayRemoteService } from '../port/outgoing/questions-gateway-remote.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionsGatewayRemoteService: QuestionsGatewayRemoteService,
              @InjectRepository(Question) private readonly questionsRepository: Repository<Question>) {
  }

  async getAllQuestionsByUser(userUuid: string) {
    return await this.questionsRepository.find({
      relations: ['answers'],
      where: { ownerUuid: userUuid },
    });
  }

  async createQuestion(userUuid: string, question: Question): Promise<void> {
    const createdQuestion = await this.questionsRepository.save(question);
    await this.questionsGatewayRemoteService.signalQuestionCreatedSuccessfully(userUuid, createdQuestion);
  }

}
