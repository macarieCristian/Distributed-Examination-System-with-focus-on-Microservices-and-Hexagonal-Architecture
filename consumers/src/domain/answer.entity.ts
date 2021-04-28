import { Column } from 'typeorm';

export class Answer {
  @Column()
  uuid: string;

  @Column()
  value?: string;

  @Column()
  checked?: string;
}
