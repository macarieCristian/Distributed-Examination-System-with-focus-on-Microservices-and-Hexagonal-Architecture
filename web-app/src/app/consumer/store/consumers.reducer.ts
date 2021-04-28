import {createReducer, on} from '@ngrx/store';
import {
  clearActiveExam,
  loadActiveExamFailed,
  loadActiveExamStart,
  loadActiveExamSuccess,
  loadExamHeadersFailed,
  loadExamHeadersStart,
  loadExamHeadersSuccess,
  submitExamFailed,
  submitExamStart,
  submitExamSuccess
} from './consumers.actions';
import {mapKeys} from 'lodash';
import {Exam, ExamHeader} from '../../models/exam.model';

export const consumersFeatureKey = 'consumers';

export interface ConsumersState {
  examHeaders: { [uuid: string]: ExamHeader };
  loadExamHeadersErrorMessage: string | undefined;
  loadExamHeadersLoading: boolean;
  activeExam: Exam;
  loadActiveExamErrorMessage: string | undefined;
  loadActiveExamLoading: boolean;
  submitExamErrorMessage: string | undefined;
  submitExamLoading: boolean;
}

const initialConsumersState: ConsumersState = {
  examHeaders: {},
  loadExamHeadersErrorMessage: undefined,
  loadExamHeadersLoading: false,
  activeExam: undefined,
  loadActiveExamErrorMessage: undefined,
  loadActiveExamLoading: false,
  submitExamErrorMessage: undefined,
  submitExamLoading: false,
};

export const consumersReducer = createReducer(initialConsumersState,
  on(loadExamHeadersStart, (state) => (
    {
      ...state,
      loadExamHeadersLoading: true
    }
  )),
  on(loadExamHeadersSuccess, (state, {examHeaders}) => (
    {
      ...state,
      examHeaders: mapKeys(examHeaders, 'uuid'),
      loadExamHeadersErrorMessage: undefined,
      loadExamHeadersLoading: false
    }
  )),
  on(loadExamHeadersFailed, (state, {errorMessage}) => (
    {
      ...state,
      loadExamHeadersErrorMessage: errorMessage,
      loadExamHeadersLoading: false
    }
  )),
  on(loadActiveExamStart, (state) => (
    {
      ...state,
      loadActiveExamLoading: true
    }
  )),
  on(loadActiveExamSuccess, (state, {exam}) => (
    {
      ...state,
      activeExam: exam,
      loadActiveExamErrorMessage: undefined,
      loadActiveExamLoading: false
    }
  )),
  on(loadActiveExamFailed, (state, {errorMessage}) => (
    {
      ...state,
      loadActiveExamErrorMessage: errorMessage,
      loadActiveExamLoading: false
    }
  )),
  on(submitExamStart, (state) => (
    {
      ...state,
      submitExamLoading: true
    }
  )),
  on(submitExamSuccess, (state) => (
    {
      ...state,
      submitExamErrorMessage: undefined,
      submitExamLoading: false
    }
  )),
  on(submitExamFailed, (state, {errorMessage}) => (
    {
      ...state,
      submitExamErrorMessage: errorMessage,
      submitExamLoading: false
    }
  )),
  on(clearActiveExam, (state) => (
    {
      ...state,
      activeExam: undefined,
      loadActiveExamErrorMessage: undefined,
      loadActiveExamLoading: false
    }
  ))
);
