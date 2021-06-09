import { CreateExamAnswerDto } from '../../../incoming/dto/create-exam-answer/create-exam-answer-dto';
import { GetExamAnswersDto } from '../../../../../exams/port/outgoing/dto/get-exam-answers/get-exam-answers-dto';

export interface CreateExamAnswerDtoOut {
  submittedExamAnswer: CreateExamAnswerDto;
  providerExamAnswer: GetExamAnswersDto;
}
