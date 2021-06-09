import { QuestionDtoOut } from './question-dto-out';

export interface ExamQuestionsDtoOut {
  examUuid: string;
  questionUuid: string;
  weight: number;
  question: QuestionDtoOut;
}
