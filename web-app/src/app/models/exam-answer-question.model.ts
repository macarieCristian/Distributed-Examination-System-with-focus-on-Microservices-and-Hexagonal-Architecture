import {ExamAnswerQuestionAnswer} from './exam-answer-question-answer.model';

export interface ExamAnswerQuestion {
  uuid: string;
  ownerUuid: string;
  answers: { [uuid: string]: ExamAnswerQuestionAnswer };
}
