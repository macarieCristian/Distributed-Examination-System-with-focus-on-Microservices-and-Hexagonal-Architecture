import { QuestionType } from './enum/question-type.enum';
import { Answer } from './answer.entity';

export interface Question {
  uuid?: string;
  ownerUuid: string;
  text: string;
  description: string;
  category: string;
  type: QuestionType;
  answers: Answer[];
}
