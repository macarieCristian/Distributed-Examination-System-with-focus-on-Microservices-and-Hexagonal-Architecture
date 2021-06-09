export interface ExamGrade {
  id?: any;
  examUuid: string;
  ownerUuid: string;
  consumerUuid?: string;
  grade: number;
}
