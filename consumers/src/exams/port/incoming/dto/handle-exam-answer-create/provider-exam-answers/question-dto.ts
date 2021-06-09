import { AnswerDto } from './answer-dto';
import { QuestionType } from '../../../../../../domain/enums/question-type.enum';

export interface QuestionDto {
  uuid: string;
  ownerUuid: string;
  category: string;
  type: QuestionType;
  answers: AnswerDto[];
}
