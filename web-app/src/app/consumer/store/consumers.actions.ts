import {createAction} from '@ngrx/store';
import {Exam, ExamHeader} from '../../models/exam.model';
import {ExamAnswerDto} from '../../dtos/exam.answer.dto';

export const loadExamHeadersStart = createAction('[Consumers] Load exam headers start');
export const loadExamHeadersSuccess = createAction('[Consumers] Load exam headers success', (examHeaders: ExamHeader[]) => ({examHeaders}));
export const loadExamHeadersFailed = createAction('[Consumers] Load exam headers failed', (errorMessage: string) => ({errorMessage}));

export const loadActiveExamStart = createAction('[Consumers] Load active exam start', (examUuid: string) => ({examUuid}));
export const loadActiveExamSuccess = createAction('[Consumers] Load active exam success', (exam: Exam) => ({exam}));
export const loadActiveExamFailed = createAction('[Consumers] Load active exam failed', (errorMessage: string) => ({errorMessage}));
export const clearActiveExam = createAction('[Consumers] Clear active exam');

export const submitExamStart = createAction('[Consumers] Submit exam start', (examAnswer: ExamAnswerDto) => ({examAnswer}));
export const submitExamSuccess = createAction('[Consumers] Submit exam success');
export const submitExamFailed = createAction('[Consumers] Submit exam failed', (errorMessage: string) => ({errorMessage}));

export const redirect = createAction('[Consumers] Redirect', (path: string) => ({path}));


