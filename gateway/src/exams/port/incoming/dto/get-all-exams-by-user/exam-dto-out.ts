import { ExamQuestionDtoOut } from './exam-question-dto-out';

export interface ExamDtoOut {
  uuid: string;
  ownerUuid: string;
  title: string;
  description: string;
  available: boolean;
  duration: number;
  examQuestions: ExamQuestionDtoOut[];
}
