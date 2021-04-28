import {User} from '../../models/user.model';
import {createReducer, on} from '@ngrx/store';
import {authActionFailed, clearError, loginStart, loginSucceeded, logoutSucceeded, registerStart, registerSucceeded} from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  currentUser: User | undefined;
  errorMessage: string | undefined;
  loading: boolean;
}

const initialAuthState: AuthState = {
  currentUser: undefined,
  errorMessage: undefined,
  loading: false
};

export const authReducer = createReducer(initialAuthState,
  on(loginStart, (state, _) => (
    {
      ...state,
      loading: true
    }
  )),
  on(loginSucceeded, (state, {currentUser}) => (
    {
      ...state,
      currentUser: {...currentUser},
      errorMessage: undefined,
      loading: false
    }
  )),
  on(registerStart, (state, _) => (
    {
      ...state,
      loading: true
    }
  )),
  on(registerSucceeded, (state) => (
    {
      ...state,
      errorMessage: undefined,
      loading: false
    }
  )),
  on(logoutSucceeded, (state) => (
    {
      ...state,
      currentUser: undefined
    }
  )),
  on(authActionFailed, (state, {errorMessage}) => (
    {
      ...state,
      errorMessage,
      loading: false
    }
  )),
  on(clearError, (state) => (
    {
      ...state,
      errorMessage: undefined
    }
  ))
);
