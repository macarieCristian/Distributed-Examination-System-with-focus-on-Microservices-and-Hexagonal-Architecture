import {createReducer, on} from '@ngrx/store';
import {Exam} from '../../models/exam.model';
import {addExamFailed, addExamStart, addExamSuccess, loadExamsFailed, loadExamsStart, loadExamsSuccess} from './exams.actions';
import {mapKeys} from 'lodash';

export const examsFeatureKey = 'exams';

export interface ExamsState {
  exams: { [uuid: string]: Exam };
  loadExamsErrorMessage: string | undefined;
  loadExamsLoading: boolean;
  addExamErrorMessage: string | undefined;
  addExamLoading: boolean;
}

const initialExamsState: ExamsState = {
  exams: {},
  loadExamsErrorMessage: undefined,
  loadExamsLoading: false,
  addExamErrorMessage: undefined,
  addExamLoading: false
};

export const examsReducer = createReducer(initialExamsState,
  on(loadExamsStart, (state) => (
    {
      ...state,
      loadExamsLoading: true
    }
  )),
  on(loadExamsSuccess, (state, {exams}) => (
    {
      ...state,
      exams: mapKeys(exams, 'uuid'),
      loadExamsErrorMessage: undefined,
      loadExamsLoading: false
    }
  )),
  on(loadExamsFailed, (state, {errorMessage}) => (
    {
      ...state,
      loadExamsErrorMessage: errorMessage,
      loadExamsLoading: false
    }
  )),
  on(addExamStart, (state) => (
    {
      ...state,
      addExamLoading: true
    }
  )),
  on(addExamSuccess, (state, {exam}) => (
    {
      ...state,
      exams: {...state.exams, [exam.uuid]: exam},
      addExamErrorMessage: undefined,
      addExamLoading: false
    }
  )),
  on(addExamFailed, (state, {errorMessage}) => (
    {
      ...state,
      addExamErrorMessage: errorMessage,
      addExamLoading: false
    }
  ))
);
