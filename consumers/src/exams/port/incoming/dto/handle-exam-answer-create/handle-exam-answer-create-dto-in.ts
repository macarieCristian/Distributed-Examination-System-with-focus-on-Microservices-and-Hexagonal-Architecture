import { ExamAnswerCreateDtoIn } from './exam-answer-create/exam-answer-create-dto-in';
import { ProviderExamAnswersDto } from './provider-exam-answers/provider-exam-answers-dto';

export interface HandleExamAnswerCreateDtoIn {
  submittedExamAnswer: ExamAnswerCreateDtoIn;
  providerExamAnswer: ProviderExamAnswersDto;
}
