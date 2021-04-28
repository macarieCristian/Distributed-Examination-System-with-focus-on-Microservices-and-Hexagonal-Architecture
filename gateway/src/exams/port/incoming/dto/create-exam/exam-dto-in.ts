import { ExamQuestionDtoIn } from './exam-question-dto-in';

export interface ExamDtoIn {
  title: string;
  description: string;
  duration: number;
  examQuestions: ExamQuestionDtoIn[];
}
