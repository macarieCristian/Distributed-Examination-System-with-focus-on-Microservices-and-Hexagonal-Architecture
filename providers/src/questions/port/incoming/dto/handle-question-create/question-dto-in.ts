import { Question } from '../../../../../domain/question.entity';

export interface QuestionDtoIn {
  userUuid: string;
  question: Question;
}
