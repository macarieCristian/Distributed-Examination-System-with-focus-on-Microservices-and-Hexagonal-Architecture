import { Question } from '../../../../../domain/question.entity';

export interface QuestionDtoOut {
  userUuid: string;
  question: Question;
}
