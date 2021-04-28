import { ExamDtoOut } from './exam-dto-out';

export interface SignalExamCreatedSuccessfullyDtoOut {
  userUuid: string;
  exam: ExamDtoOut;
}
