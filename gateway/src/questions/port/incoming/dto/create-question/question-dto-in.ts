import { QuestionType } from '../../../../../domain/enum/question-type.enum';
import { AnswerDtoIn } from './answer-dto-in';

export interface QuestionDtoIn {
  text: string;
  description: string;
  category: string;
  type: QuestionType;
  answers: AnswerDtoIn[];
}
