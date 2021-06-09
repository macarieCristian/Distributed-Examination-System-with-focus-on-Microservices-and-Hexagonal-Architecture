import { ExamQuestionsDtoOut } from './exam-questions-dto-out';

export interface HandleGetExamAnswersDtoOut {
  uuid: string;
  ownerUuid: string;
  available: boolean;
  duration: number;
  examQuestions: ExamQuestionsDtoOut[];
}
