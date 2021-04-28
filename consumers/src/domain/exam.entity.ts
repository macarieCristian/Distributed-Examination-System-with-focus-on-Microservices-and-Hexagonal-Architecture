import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity('exam-answers')
export class ExamAnswer {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  examUuid: string;

  @Column()
  ownerUuid: string;

  @Column()
  consumerUuid: string;

  @Column()
  startedAt: number;

  @Column()
  submittedAt: number;

  @Column()
  grade: number;

  @Column(() => Question)
  questions: Question[];
}
