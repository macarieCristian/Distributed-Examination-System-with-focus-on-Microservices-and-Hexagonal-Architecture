import { ExamDtoIn } from './exam-dto-in';

export interface HandleExamCreateDtoIn {
  userUuid: string;
  exam: ExamDtoIn;
}
