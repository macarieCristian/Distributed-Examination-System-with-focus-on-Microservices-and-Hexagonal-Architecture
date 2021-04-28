import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AppState} from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {logoutStart} from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private store: Store<AppState>,
              private http: HttpClient) {
  }

  register(user: User): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/register`, user, {withCredentials: true});
  }

  login(email: string, password: string): Observable<{ exp: number }> {
    return this.http.post<{ exp: number }>(`${environment.baseUrl}/auth/login`, {email, password}, {
      withCredentials: true
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.baseUrl}/auth/logout`, null, {withCredentials: true});
  }

  getUserDetails(): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/api/user`, {withCredentials: true});
  }

  setLogoutTimer(exp: number): void {
    const date = new Date(0);
    date.setSeconds(Math.floor(exp / 1000));
    console.log(`expires in: ${date.toISOString().substr(11, 8)}`);

    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(logoutStart());
    }, exp);
  }

  clearLogoutTimer(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}
