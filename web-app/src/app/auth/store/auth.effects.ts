import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  attemptWebsocketConnection,
  authActionFailed,
  autoLogin,
  loginStart,
  loginSucceeded,
  logoutStart,
  logoutSucceeded,
  redirect,
  registerStart,
  registerSucceeded
} from './auth.actions';
import {catchError, delay, mergeMap, switchMap, tap} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {WebsocketService} from '../../shared/service/websocket.service';
import {StoreUtils} from '../../store/store-utils';
import {UserRole} from '../../models/enum/user-role.enum';
import {resetAppState} from '../../store/app.actions';

@Injectable()
export class AuthEffects {
  loginStartEffect = createEffect(
    () => this.actions$
      .pipe(
        ofType(loginStart),
        delay(250),
        switchMap(loginStartAction => this.authService.login(loginStartAction.email, loginStartAction.password)
          .pipe(
            switchMap(() => this.authService.getUserDetails()
              .pipe(
                tap((currentUser) => {
                  const newUser = {...currentUser, exp: (currentUser.exp - 5) * 1000};
                  this.authService.setLogoutTimer(newUser.exp - Date.now());
                  localStorage.setItem('userData', JSON.stringify(newUser));
                }),
                mergeMap(currentUser => [
                  loginSucceeded(currentUser),
                  currentUser?.role === UserRole.ADMIN ? redirect('/dashboard') : redirect('/consumer'),
                  attemptWebsocketConnection()
                ])
              )
            ),
            catchError(errorRes => StoreUtils.handleEffectError(errorRes, authActionFailed))
          )
        )
      )
  );

  registerStartEffect = createEffect(
    () => this.actions$
      .pipe(
        ofType(registerStart),
        delay(250),
        switchMap(registerStartAction => this.authService.register(
          {
            name: registerStartAction.name,
            email: registerStartAction.email,
            password: registerStartAction.password
          }
          ).pipe(
          mergeMap(() => [registerSucceeded(), redirect('/auth/login')]),
          catchError(errorRes => StoreUtils.handleEffectError(errorRes, authActionFailed))
          )
        )
      )
  );

  logoutStartEffect = createEffect(
    () => this.actions$
      .pipe(
        ofType(logoutStart),
        switchMap(() => this.authService.logout()
          .pipe(
            tap(() => {
              this.authService.clearLogoutTimer();
              localStorage.removeItem('userData');
              this.websocketService.disconnect();
            }),
            mergeMap(() => [logoutSucceeded(), resetAppState(), redirect('/auth/login')]),
            catchError(errorRes => StoreUtils.handleEffectError(errorRes, authActionFailed))
          )
        )
      )
  );

  redirectEffect = createEffect(
    () => this.actions$
      .pipe(
        ofType(redirect),
        tap(action => this.router.navigate([action.path]))
      ),
    {dispatch: false}
  );

  autoLoginEffect = createEffect(
    () => this.actions$
      .pipe(
        ofType(autoLogin),
        mergeMap(() => {
          const userData: User = JSON.parse(localStorage.getItem('userData'));
          if (!userData || !userData.exp || Date.now() > userData.exp) {
            return [{type: 'NOT_EXISTING'}];
          }
          this.authService.setLogoutTimer(userData.exp - Date.now());
          return [loginSucceeded(userData), attemptWebsocketConnection()];
        })
      )
  );

  attemptWebsocketConnectEffect = createEffect(
    () => this.actions$
      .pipe(
        ofType(attemptWebsocketConnection),
        tap(() => this.websocketService.connect())
      ),
    {dispatch: false}
  );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router,
              private websocketService: WebsocketService) {
  }
}
