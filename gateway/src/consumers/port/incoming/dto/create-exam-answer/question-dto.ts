import { AnswerDto } from './answer-dto';

export interface QuestionDto {
  uuid: string;
  ownerUuid: string;
  answers: AnswerDto[];
}
