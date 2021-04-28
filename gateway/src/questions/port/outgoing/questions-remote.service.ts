import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Service } from '../../../domain/enum/service';
import { ClientProxy } from '@nestjs/microservices';
import { Question } from '../../../domain/question.entity';
import { ProvidersEvents } from '../../../domain/enum/providers-events.enum';
import { QuestionDtoOut } from './dto/create-question/question-dto-out';
import { ExceptionCode } from '../../../domain/enum/exception-code.enum';
import { Commands } from '../../../domain/enum/commands.enum';

@Injectable()
export class QuestionsRemoteService {
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

  async getAllQuestionsByUser(userUuid: string): Promise<Question[]> {
    try {
      return await this.remoteProvidersClient.send({ cmd: Commands.GET_QUESTIONS_BY_USER }, userUuid).toPromise();
    } catch (err) {
      QuestionsRemoteService.handleError(err);
    }
  }

  async createQuestion(userUuid: string, question: Question): Promise<void> {
    this.remoteProvidersClient.emit<ProvidersEvents, QuestionDtoOut>(ProvidersEvents.CREATE_QUESTION, {
      userUuid,
      question,
    });
  }

}
