import { ExamDtoIn } from './exam-dto-in';

export interface HandleExamCreateSuccessDtoIn {
  userUuid: string;
  exam: ExamDtoIn;
}
