import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {selectAuthErrorMessage, selectAuthLoading} from '../../store/app.selectors';
import {NgForm} from '@angular/forms';
import {clearError, loginStart} from '../store/auth.actions';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage: string;
  loading: boolean;
  private subscriptionAuthError: Subscription;
  private subscriptionLoading: Subscription;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscriptionAuthError = this.store.select(selectAuthErrorMessage)
      .subscribe(errorMsg => this.errorMessage = errorMsg);
    this.subscriptionLoading = this.store.select(selectAuthLoading)
      .subscribe(loading => this.loading = loading);
  }

  ngOnDestroy(): void {
    this.subscriptionAuthError.unsubscribe();
    this.subscriptionLoading.unsubscribe();
  }

  onSubmit(authForm: NgForm): void {
    if (authForm.valid) {
      this.store.dispatch(loginStart(authForm.value));
      authForm.resetForm();
    }
  }

  onNavigate(): void {
    this.store.dispatch(clearError());
    this.router.navigate(['../register'], {relativeTo: this.route});
  }
}
