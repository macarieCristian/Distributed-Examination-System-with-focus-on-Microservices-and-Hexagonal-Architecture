import { ExamAnswerQuestionDto } from './exam-answer-question-dto';

export interface HandleGetAllUserExamAnswersByOwnerDto {
  id?: any;
  examUuid: string;
  ownerUuid: string;
  consumerUuid?: string;
  startedAt: number;
  submittedAt?: number;
  grade?: number;
  questions: ExamAnswerQuestionDto[];
}
