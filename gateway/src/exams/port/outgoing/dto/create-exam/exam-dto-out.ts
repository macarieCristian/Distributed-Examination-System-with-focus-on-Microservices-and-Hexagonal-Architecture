import { Exam } from '../../../../../domain/exam.entity';

export interface ExamDtoOut {
  userUuid: string;
  exam: Exam;
}
