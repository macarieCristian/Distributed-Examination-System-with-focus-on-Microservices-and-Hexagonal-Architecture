import { QuestionDto } from './question-dto';

export interface CreateExamAnswerDto {
  examUuid: string;
  ownerUuid: string;
  consumerUuid?: string;
  startedAt: number;
  submittedAt?: number;
  questions: QuestionDto[];
}
