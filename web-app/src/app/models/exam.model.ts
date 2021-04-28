import {ExamQuestion} from './exam-question.model';
import {Question} from './question.model';

export interface ExamHeader {
  uuid: string;
  ownerUuid: string;
  title: string;
  description: string;
  duration: number;
  available: boolean;
}

export interface Exam extends ExamHeader {
  examQuestions: ExamQuestion[];
  questions?: Question[];
}
