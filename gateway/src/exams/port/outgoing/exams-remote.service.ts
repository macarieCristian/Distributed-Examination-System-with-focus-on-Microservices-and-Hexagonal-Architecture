import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Service } from '../../../domain/enum/service';
import { ClientProxy } from '@nestjs/microservices';
import { ProvidersEvents } from '../../../domain/enum/providers-events.enum';
import { ExceptionCode } from '../../../domain/enum/exception-code.enum';
import { Exam } from '../../../domain/exam.entity';
import { ExamDtoOut } from './dto/create-exam/exam-dto-out';
import { Commands } from '../../../domain/enum/commands.enum';
import { GetConsumerAvailableExamDto } from './dto/get-consumer-available-exam/get-consumer-available-exam-dto';
import { GetConsumerAvailableExamHeaderDto } from './dto/get-consumer-available-exam-header/get-consumer-available-exam-header-dto';

@Injectable()
export class ExamsRemoteService {
  constructor(@Inject(Service.PROVIDERS) private readonly remoteProvidersClient: ClientProxy) {
  }

  private static handleError(err): void {
    const errorCode = err.code || ExceptionCode.INTERNAL_SERVER;
    switch (errorCode) {
      case ExceptionCode.NOT_FOUND:
        throw new NotFoundException(err.message);
      default:
        throw new InternalServerErrorException(`[ProvidersService-failed]: ${err.message}`);
    }
  }

  async getAllExamsByUser(userUuid: string): Promise<Exam[]> {
    try {
      return await this.remoteProvidersClient.send({ cmd: Commands.GET_EXAMS_BY_USER }, userUuid).toPromise();
    } catch (err) {
      ExamsRemoteService.handleError(err);
    }
  }

  async createExam(userUuid: string, exam: Exam): Promise<void> {
    this.remoteProvidersClient.emit<ProvidersEvents, ExamDtoOut>(ProvidersEvents.CREATE_EXAM, {
      userUuid,
      exam,
    });
  }

  async getConsumerAvailableExamsHeader(): Promise<GetConsumerAvailableExamHeaderDto[]> {
    try {
      return await this.remoteProvidersClient.send({ cmd: Commands.GET_CONSUMER_AVAILABLE_EXAMS_HEADER }, {}).toPromise();
    } catch (err) {
      ExamsRemoteService.handleError(err);
    }
  }

  async getConsumerAvailableExam(examUuid): Promise<GetConsumerAvailableExamDto> {
    try {
      return await this.remoteProvidersClient.send({ cmd: Commands.GET_CONSUMER_AVAILABLE_EXAM }, examUuid).toPromise();
    } catch (err) {
      ExamsRemoteService.handleError(err);
    }
  }
}
