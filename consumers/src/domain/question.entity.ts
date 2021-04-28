import { Answer } from './answer.entity';
import { Column } from 'typeorm';

export class Question {
  @Column()
  uuid: string;

  @Column()
  ownerUuid: string;

  @Column(() => Answer)
  answers: Answer[];
}
