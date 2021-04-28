import {Component, OnInit} from '@angular/core';
import {SharedService} from './shared/service/shared.service';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.reducer';
import {autoLogin} from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.sharedService.getRoot()
      .subscribe(() => this.store.dispatch(autoLogin()));
  }
}
