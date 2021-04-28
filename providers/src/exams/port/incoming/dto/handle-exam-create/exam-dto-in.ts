import { ExamQuestionDtoIn } from './exam-question-dto-in';

export interface ExamDtoIn {
  ownerUuid: string;
  title: string;
  description: string;
  duration: number;
  examQuestions: ExamQuestionDtoIn[];
}
