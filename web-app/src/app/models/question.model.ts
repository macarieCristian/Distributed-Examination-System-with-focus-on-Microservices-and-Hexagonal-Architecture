import {Answer} from './answer.model';
import {QuestionType} from './enum/question-type.enum';

export interface Question {
  uuid: string;
  ownerUuid: string;
  text: string;
  description: string;
  category: string;
  type: QuestionType;
  answers: Answer[];
}
