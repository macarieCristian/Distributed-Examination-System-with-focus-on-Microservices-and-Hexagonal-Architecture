import { ExamQuestionsDto } from './exam-questions-dto';

export interface GetExamAnswersDto {
  uuid: string;
  ownerUuid: string;
  available: boolean;
  duration: number;
  examQuestions: ExamQuestionsDto[];
}
