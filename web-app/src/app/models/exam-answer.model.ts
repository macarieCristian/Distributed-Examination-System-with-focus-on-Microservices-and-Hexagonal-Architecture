import {ExamAnswerQuestion} from './exam-answer-question.model';

export interface ExamAnswer {
  id?: any;
  examUuid: string;
  ownerUuid: string;
  consumerUuid?: string;
  startedAt?: number;
  submittedAt?: number;
  grade?: number;
  questions: { [uuid: string]: ExamAnswerQuestion };
}
