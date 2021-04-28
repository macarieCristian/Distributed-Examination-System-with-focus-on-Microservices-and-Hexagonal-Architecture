import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamAnswer } from '../../domain/exam.entity';
import { MongoRepository } from 'typeorm';
import { ExamsGatewayRemoteService } from '../port/outgoing/exams-gateway-remote.service';

@Injectable()
export class ExamsService {
  constructor(private readonly examsGatewayRemoteService: ExamsGatewayRemoteService,
              @InjectRepository(ExamAnswer) private readonly examsRepository: MongoRepository<ExamAnswer>) {
  }

  async createOrUpdateExamAnswer(exam: Partial<ExamAnswer>) {
    const examAnswer = await this.examsRepository.save(exam);
    await this.examsGatewayRemoteService.signalExamAnswerCreatedSuccessfully(examAnswer);
  }

  async getAllUserExamAnswersByOwner(ownerUuid: string) {
    return await this.examsRepository.find({ownerUuid});
  }
}
