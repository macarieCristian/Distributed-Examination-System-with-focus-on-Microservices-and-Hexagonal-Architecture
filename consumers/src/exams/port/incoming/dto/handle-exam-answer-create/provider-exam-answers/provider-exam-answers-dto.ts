import { ExamQuestionsDto } from './exam-questions-dto';

export interface ProviderExamAnswersDto {
  uuid: string;
  ownerUuid: string;
  available: boolean;
  duration: number;
  examQuestions: ExamQuestionsDto[];
}
