import {authReducer, AuthState} from '../auth/store/auth.reducer';
import {ActionReducer, ActionReducerMap} from '@ngrx/store';
import {questionsReducer, QuestionsState} from '../dashboard/store/questions.reducer';
import {examsReducer, ExamsState} from '../dashboard/store/exams.reducer';
import {consumersReducer, ConsumersState} from '../consumer/store/consumers.reducer';
import {statisticsReducer, StatisticsState} from '../dashboard/store/statistics.reducer';
import {resetAppState} from './app.actions';

export interface AppState {
  auth: AuthState;
  questions: QuestionsState;
  exams: ExamsState;
  consumers: ConsumersState;
  statistics: StatisticsState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  questions: questionsReducer,
  exams: examsReducer,
  consumers: consumersReducer,
  statistics: statisticsReducer,
};

export function clearAppState(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action.type === resetAppState.type) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
