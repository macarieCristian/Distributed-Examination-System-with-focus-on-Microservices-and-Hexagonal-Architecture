import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {Subscription} from 'rxjs';
import {selectAuthCurrentUser} from '../store/app.selectors';
import {User} from '../models/user.model';
import {logoutStart} from '../auth/store/auth.actions';
import {UserRole} from '../models/enum/user-role.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User;
  userRole = UserRole;
  private subscriptionCurrentUser: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.subscriptionCurrentUser = this.store.select(selectAuthCurrentUser)
      .subscribe(user => this.currentUser = user);
  }

  ngOnDestroy(): void {
    this.subscriptionCurrentUser.unsubscribe();
  }

  onLogout(): void {
    this.store.dispatch(logoutStart());
  }

  hasRole(role: UserRole): boolean {
    return this.currentUser?.role === role;
  }

}
