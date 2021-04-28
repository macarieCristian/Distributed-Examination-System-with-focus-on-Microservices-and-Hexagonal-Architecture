import {createReducer, on} from '@ngrx/store';
import {
  addQuestionFailed,
  addQuestionStart,
  addQuestionSuccess,
  loadQuestionsFailed,
  loadQuestionsStart,
  loadQuestionsSuccess
} from './questions.actions';
import {Question} from '../../models/question.model';
import {mapKeys} from 'lodash';

export const questionsFeatureKey = 'questions';

export interface QuestionsState {
  questions: { [uuid: string]: Question };
  loadQuestionsErrorMessage: string | undefined;
  loadQuestionsLoading: boolean;
  addQuestionErrorMessage: string | undefined;
  addQuestionLoading: boolean;
}

const initialQuestionsState: QuestionsState = {
  questions: {},
  loadQuestionsErrorMessage: undefined,
  loadQuestionsLoading: false,
  addQuestionErrorMessage: undefined,
  addQuestionLoading: false,
};

export const questionsReducer = createReducer(initialQuestionsState,
  on(loadQuestionsStart, (state) => (
    {
      ...state,
      loadQuestionsLoading: true
    }
  )),
  on(loadQuestionsSuccess, (state, {questions}) => (
    {
      ...state,
      questions: mapKeys(questions, 'uuid'),
      loadQuestionsErrorMessage: undefined,
      loadQuestionsLoading: false
    }
  )),
  on(loadQuestionsFailed, (state, {errorMessage}) => (
    {
      ...state,
      loadQuestionsErrorMessage: errorMessage,
      loadQuestionsLoading: false
    }
  )),
  on(addQuestionStart, (state) => (
    {
      ...state,
      addQuestionLoading: true
    }
  )),
  on(addQuestionSuccess, (state, {question}) => (
    {
      ...state,
      questions: {...state.questions, [question.uuid]: question},
      addQuestionErrorMessage: undefined,
      addQuestionLoading: false
    }
  )),
  on(addQuestionFailed, (state, {errorMessage}) => (
    {
      ...state,
      addQuestionErrorMessage: errorMessage,
      addQuestionLoading: false
    }
  ))
);
