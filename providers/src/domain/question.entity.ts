import { QuestionType } from './enum/question-type.enum';
import { Answer } from './answer.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExamQuestion } from './exam-question.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  ownerUuid: string;

  @Column()
  text: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @OneToMany(() => Answer, answer => answer.question, { cascade: true })
  answers: Answer[];

  @OneToMany(() => ExamQuestion, examQuestion => examQuestion.question)
  examQuestions: ExamQuestion[];
}
