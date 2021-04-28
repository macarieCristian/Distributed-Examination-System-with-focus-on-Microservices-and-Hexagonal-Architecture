import {createAction} from '@ngrx/store';
import {ExamAnswerDto} from '../../dtos/exam.answer.dto';

export const loadExamAnswersStart = createAction('[Statistics] Load exam answers start');
export const loadExamAnswersSuccess = createAction(
  '[Statistics] Load exam answers success',
  (examAnswers: ExamAnswerDto[]) => ({examAnswers})
);
export const loadExamAnswersFailed = createAction('[Statistics] Load exam answers failed', (errorMessage: string) => ({errorMessage}));

export const addExamAnswer = createAction('[Statistics] Add exam answer', (examAnswer: ExamAnswerDto) => ({examAnswer}));
