import { Injectable } from '@nestjs/common';
import { Exam } from '../../domain/exam.entity';
import { ExamsRemoteService } from '../port/outgoing/exams-remote.service';
import { GetConsumerAvailableExamDto } from '../port/outgoing/dto/get-consumer-available-exam/get-consumer-available-exam-dto';
import { GetConsumerAvailableExamHeaderDto } from '../port/outgoing/dto/get-consumer-available-exam-header/get-consumer-available-exam-header-dto';

@Injectable()
export class ExamsService {
  constructor(private readonly examsRemoteService: ExamsRemoteService) {
  }

  async getAllExamsByUser(userUuid: string): Promise<Exam[]> {
    return await this.examsRemoteService.getAllExamsByUser(userUuid);
  }

  async createExam(userUuid: string, exam: Exam): Promise<void> {
    await this.examsRemoteService.createExam(userUuid, exam);
  }

  async getConsumerAvailableExamsHeader(): Promise<GetConsumerAvailableExamHeaderDto[]> {
    return await this.examsRemoteService.getConsumerAvailableExamsHeader();
  }

  async getConsumerAvailableExam(examUuid: string): Promise<GetConsumerAvailableExamDto> {
    return await this.examsRemoteService.getConsumerAvailableExam(examUuid);
  }
}
