import { QuestionDtoIn } from './question-dto-in';

export interface HandleExamAnswerCreateDtoIn {
  examUuid: string;
  ownerUuid: string;
  consumerUuid: string;
  startedAt: number;
  submittedAt: number;
  questions: QuestionDtoIn[];
}
