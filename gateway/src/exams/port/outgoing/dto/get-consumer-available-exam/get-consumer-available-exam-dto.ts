import { QuestionDto } from './question-dto';

export interface GetConsumerAvailableExamDto {
  uuid: string;
  ownerUuid: string;
  title: string;
  description: string;
  available: boolean;
  duration: number;
  questions: QuestionDto[];
}
