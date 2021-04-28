import {createAction, props} from '@ngrx/store';
import {User} from '../../models/user.model';

export const loginStart = createAction('[Auth] Login start', props<{email: string, password: string}>());
export const loginSucceeded = createAction('[Auth] Login succeeded', (currentUser: User) => ({currentUser}));
export const autoLogin = createAction('[Auth] Auto login');

export const registerStart = createAction('[Auth] Register start', props<{name: string, email: string, password: string}>());
export const registerSucceeded = createAction('[Auth] Register succeeded');

export const logoutStart = createAction('[Auth] Logout start');
export const logoutSucceeded = createAction('[Auth] Logout succeeded');

export const authActionFailed = createAction('[Auth] Auth action failed', (errorMessage: string) => ({errorMessage}));
export const redirect = createAction('[Auth] Redirect', (path: string) => ({path}));
export const clearError = createAction('[Auth] Clear error');
export const attemptWebsocketConnection = createAction('[Auth] Attempt a websocket connection');

