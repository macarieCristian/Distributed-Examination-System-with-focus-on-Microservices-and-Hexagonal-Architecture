import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamAnswer } from '../../domain/exam.entity';
import { MongoRepository } from 'typeorm';
import { ExamsGatewayRemoteService } from '../port/outgoing/exams-gateway-remote.service';
import { ProviderExamAnswersDto } from '../port/incoming/dto/handle-exam-answer-create/provider-exam-answers/provider-exam-answers-dto';
import { ExamAnswerCreateDtoIn } from '../port/incoming/dto/handle-exam-answer-create/exam-answer-create/exam-answer-create-dto-in';
import { QuestionDtoIn } from '../port/incoming/dto/handle-exam-answer-create/exam-answer-create/question-dto-in';
import { QuestionDto } from '../port/incoming/dto/handle-exam-answer-create/provider-exam-answers/question-dto';
import { mapKeys } from 'lodash';
import { QuestionType } from '../../domain/enums/question-type.enum';

@Injectable()
export class ExamsService {
  constructor(private readonly examsGatewayRemoteService: ExamsGatewayRemoteService,
              @InjectRepository(ExamAnswer) private readonly examAnswerRepository: MongoRepository<ExamAnswer>) {
  }

  async createOrUpdateExamAnswer(submittedExamAnswer: ExamAnswerCreateDtoIn, providerExamAnswer: ProviderExamAnswersDto) {
    const examAnswer = await this.examAnswerRepository.save(
      {
        ...submittedExamAnswer,
        grade: this.computeExamAnswerGrade(submittedExamAnswer, providerExamAnswer),
      },
    );
    await this.examsGatewayRemoteService.signalExamAnswerCreatedSuccessfully(examAnswer);
  }

  async getAllUserExamAnswersByOwner(ownerUuid: string) {
    return await this.examAnswerRepository.find({ ownerUuid });
  }

  private computeExamAnswerGrade(submittedExamAnswer: ExamAnswerCreateDtoIn, providerExamAnswer: ProviderExamAnswersDto): number {
    const providerExamQuestionMap = mapKeys(providerExamAnswer.examQuestions, 'questionUuid');
    let points = 0;
    for (const question of submittedExamAnswer.questions) {
      const providerExamQuestion = providerExamQuestionMap[question.uuid];
      if (providerExamQuestion && this.correctQuestionAnswers(question, providerExamQuestion.question)) {
        points += providerExamQuestion.weight;
      }
    }

    return points;
  }

  private correctQuestionAnswers(submittedQuestion: QuestionDtoIn, providerQuestion: QuestionDto): boolean {
    if (!providerQuestion) return false;
    if (QuestionType.FREE_TEXT === providerQuestion.type) return true;

    const providerAnswersMap = mapKeys(providerQuestion.answers, 'uuid');

    for (const answer of submittedQuestion.answers) {
      const providerAnswer = providerAnswersMap[answer.uuid];
      if (providerAnswer?.rightAnswer !== !!answer.checked) return false;
    }
    return true;
  }
}
