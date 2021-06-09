import { QuestionType } from '../../../../../domain/enum/question-type.enum';
import { AnswerDto } from './answer-dto';

export interface QuestionDto {
  uuid: string;
  ownerUuid: string;
  category: string;
  type: QuestionType;
  answers: AnswerDto[];
}
