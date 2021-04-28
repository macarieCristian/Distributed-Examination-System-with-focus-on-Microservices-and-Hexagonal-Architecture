import { ExamQuestionDtoIn } from './exam-question-dto-in';

export interface ExamDtoIn {
  uuid: string;
  ownerUuid: string;
  title: string;
  description: string;
  available: boolean;
  duration: number;
  examQuestions: ExamQuestionDtoIn[];
}
