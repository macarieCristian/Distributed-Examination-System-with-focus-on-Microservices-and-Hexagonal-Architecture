import { Column, Entity, ManyToOne } from 'typeorm';
import { Question } from './question.entity';
import { Exam } from './exam.entity';

@Entity('exam_question')
export class ExamQuestion {
  @Column({primary: true})
  examUuid: string;

  @Column({primary: true})
  questionUuid: string;

  @ManyToOne(() => Exam, exam => exam.examQuestions, { primary: true })
  exam: Exam;

  @ManyToOne(
    () => Question,
    question => question.examQuestions,
    { primary: true, cascade: ['update'] },
  )
  question: Question;

  @Column()
  weight: number;
}
