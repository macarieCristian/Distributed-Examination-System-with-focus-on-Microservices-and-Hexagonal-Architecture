import { ExamQuestion } from './exam-question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exams')
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  ownerUuid: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column({ default: true })
  available: boolean;

  @OneToMany(() => ExamQuestion, examQuestion => examQuestion.exam, { cascade: true })
  examQuestions: ExamQuestion[];
}
