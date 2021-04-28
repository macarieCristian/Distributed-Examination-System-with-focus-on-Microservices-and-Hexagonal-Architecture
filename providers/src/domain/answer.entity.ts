import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  text: string;

  @Column()
  rightAnswer: boolean;

  @ManyToOne(() => Question, question => question.answers)
  question: Question;
}
