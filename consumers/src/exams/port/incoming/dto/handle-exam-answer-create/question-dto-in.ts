import { AnswerDtoIn } from './answer-dto-in';

export interface QuestionDtoIn {
  uuid: string;
  ownerUuid: string;
  answers: AnswerDtoIn[];
}
