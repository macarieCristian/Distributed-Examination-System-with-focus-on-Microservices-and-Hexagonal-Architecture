import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Service } from '../../../domain/enum/service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateExamAnswerDto } from '../incoming/dto/create-exam-answer/create-exam-answer-dto';
import { ConsumersEvents } from '../../../domain/enum/consumers-events.enum';
import { Commands } from '../../../domain/enum/commands.enum';
import { ExceptionCode } from '../../../domain/enum/exception-code.enum';
import { GetExamAnswersDto } from '../../../exams/port/outgoing/dto/get-exam-answers/get-exam-answers-dto';
import { CreateExamAnswerDtoOut } from './dto/create-exam-answer/create-exam-answer-dto-out';

@Injectable()
export class ConsumersRemoteService {
  constructor(@Inject(Service.CONSUMERS) private readonly remoteConsumersClient: ClientProxy) {
  }

  private static handleError(err): void {
    const errorCode = err.code || ExceptionCode.INTERNAL_SERVER;
    switch (errorCode) {
      case ExceptionCode.NOT_FOUND:
        throw new NotFoundException(err.message);
      default:
        throw new InternalServerErrorException(`[ConsumersService-failed]: ${err.message}`);
    }
  }

  async createExamAnswer(createExamAnswerDtoIn: CreateExamAnswerDto, providerExamAnswer: GetExamAnswersDto) {
    this.remoteConsumersClient.emit<ConsumersEvents, CreateExamAnswerDtoOut>(
      ConsumersEvents.CREATE_EXAM_ANSWER,
      { submittedExamAnswer: createExamAnswerDtoIn, providerExamAnswer },
    );
  }

  async getAllUserExamAnswersByOwner(uuid: string) {
    try {
      return await this.remoteConsumersClient.send({ cmd: Commands.GET_ALL_USER_EXAM_ANSWERS_BY_OWNER }, uuid).toPromise();
    } catch (err) {
      ConsumersRemoteService.handleError(err);
    }
  }
}
