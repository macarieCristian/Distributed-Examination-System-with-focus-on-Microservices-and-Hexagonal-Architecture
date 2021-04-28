import {createAction} from '@ngrx/store';
import {Question} from '../../models/question.model';

export const loadQuestionsStart = createAction('[Questions] Load questions start');
export const loadQuestionsSuccess = createAction('[Questions] Load questions success', (questions: Question[]) => ({questions}));
export const loadQuestionsFailed = createAction('[Questions] Load questions failed', (errorMessage: string) => ({errorMessage}));

export const addQuestionStart = createAction('[Questions] Add question start', (question: Question) => ({question}));
export const addQuestionSuccess = createAction('[Questions] Add question success', (question: Question) => ({question}));
export const addQuestionFailed = createAction('[Questions] Add question failed', (errorMessage: string) => ({errorMessage}));


