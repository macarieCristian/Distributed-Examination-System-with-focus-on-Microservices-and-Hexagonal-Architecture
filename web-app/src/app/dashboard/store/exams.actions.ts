import {createAction} from '@ngrx/store';
import {Exam} from '../../models/exam.model';

export const loadExamsStart = createAction('[Exams] Load exams start');
export const loadExamsSuccess = createAction('[Exams] Load exams success', (exams: Exam[]) => ({exams}));
export const loadExamsFailed = createAction('[Exams] Load exams failed', (errorMessage: string) => ({errorMessage}));

export const addExamStart = createAction('[Exams] Add exam start', (exam: Exam) => ({exam}));
export const addExamSuccess = createAction('[Exams] Add exam success', (exam: Exam) => ({exam}));
export const addExamFailed = createAction('[Exams] Add exam failed', (errorMessage: string) => ({errorMessage}));

