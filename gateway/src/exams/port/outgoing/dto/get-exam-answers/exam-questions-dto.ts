import { QuestionDto } from './question-dto';

export interface ExamQuestionsDto {
  examUuid: string;
  questionUuid: string;
  weight: number;
  question: QuestionDto;
}
