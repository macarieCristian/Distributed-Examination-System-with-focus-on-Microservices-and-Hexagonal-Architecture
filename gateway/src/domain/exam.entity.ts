import { ExamQuestion } from './exam-question.entity';

export interface Exam {
  uuid?: string;
  ownerUuid: string;
  title: string;
  description: string;
  duration: number;
  available?: boolean;
  examQuestions: ExamQuestion[];
}
