import {ExamAnswerQuestionAnswerDto} from './exam-answer-question-answer.dto';

export interface ExamAnswerQuestionDto {
  uuid: string;
  ownerUuid: string;
  answers: ExamAnswerQuestionAnswerDto[];
}
