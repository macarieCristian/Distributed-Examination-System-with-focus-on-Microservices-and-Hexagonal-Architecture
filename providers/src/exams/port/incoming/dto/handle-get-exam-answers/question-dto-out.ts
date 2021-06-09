import { QuestionType } from '../../../../../domain/enum/question-type.enum';
import { AnswerDtoOut } from './answer-dto-out';

export interface QuestionDtoOut {
  uuid: string;
  ownerUuid: string;
  category: string;
  type: QuestionType;
  answers: AnswerDtoOut[];
}
