import { QuestionDtoOut } from './question-dto-out';

export interface HandleGetConsumerAvailableExamDtoOut {
  uuid: string;
  ownerUuid: string;
  title: string;
  description: string;
  available: boolean;
  duration: number;
  questions: QuestionDtoOut[];
}
