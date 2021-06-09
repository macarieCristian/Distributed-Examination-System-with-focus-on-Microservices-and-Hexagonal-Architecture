import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamsGatewayRemoteService } from '../port/outgoing/exams-gateway-remote.service';
import { Exam } from '../../domain/exam.entity';
import { RpcException } from '@nestjs/microservices';
import { ExceptionValueObject } from '../../domain/exception-value-object';
import { ExceptionCode } from '../../domain/enum/exception-code.enum';

@Injectable()
export class ExamsService {
  constructor(private readonly examsGatewayRemoteService: ExamsGatewayRemoteService,
              @InjectRepository(Exam) private readonly examsRepository: Repository<Exam>) {
  }

  async getAllExamsByUser(userUuid: string): Promise<Exam[]> {
    return await this.examsRepository.find({
      relations: ['examQuestions'],
      where: { ownerUuid: userUuid },
    });
  }

  async createExam(userUuid: string, exam: Exam): Promise<void> {
    const createdExam = await this.examsRepository.save(exam);
    await this.examsGatewayRemoteService.signalExamCreatedSuccessfully(userUuid, createdExam);
  }

  async getConsumerAvailableExamsHeader(): Promise<Exam[]> {
    return await this.examsRepository.find({ available: true });
  }

  async getConsumerAvailableExam(examUuid: string): Promise<Exam> {
    const exam = await this.examsRepository
      .createQueryBuilder('exam')
      .innerJoinAndSelect('exam.examQuestions', 'examQuestions')
      .innerJoinAndSelect('examQuestions.question', 'question')
      .innerJoin('question.answers', 'answers')
      .addSelect(['answers.uuid', 'answers.text'])
      .where({ uuid: examUuid, available: true })
      .getOne();
    if (!exam) {
      throw new RpcException(new ExceptionValueObject(
        ExceptionCode.NOT_FOUND,
        `Exam with id ${examUuid} was not found`,
      ));
    }
    return exam;
  }

  async getExamAnswers(examUuid: string): Promise<Exam> {
    const exam = await this.examsRepository
      .createQueryBuilder('exam')
      .select(['exam.uuid', 'exam.ownerUuid', 'exam.duration', 'exam.available'])
      .innerJoinAndSelect('exam.examQuestions', 'examQuestions')
      .innerJoin('examQuestions.question', 'question')
      .addSelect(['question.uuid', 'question.ownerUuid', 'question.category', 'question.type'])
      .innerJoin('question.answers', 'answers')
      .addSelect(['answers.uuid', 'answers.rightAnswer'])
      .where({ uuid: examUuid })
      .getOne();
    if (!exam) {
      throw new RpcException(new ExceptionValueObject(
        ExceptionCode.NOT_FOUND,
        `Exam with id ${examUuid} was not found`,
      ));
    }
    return exam;
  }

}
