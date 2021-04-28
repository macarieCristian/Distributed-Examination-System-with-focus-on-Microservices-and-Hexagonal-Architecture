import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {appReducer, clearAppState} from './store/app.reducer';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';
import {SharedModule} from './shared/shared.module';
import {QuestionsEffects} from './dashboard/store/questions.effects';
import {ExamsEffects} from './dashboard/store/exams.effects';
import {ConsumersEffects} from './consumer/store/consumers.effects';
import {StatisticsEffects} from './dashboard/store/statistics.effects';

const material = [
  MatToolbarModule
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(appReducer, {metaReducers: [clearAppState]}),
    EffectsModule.forRoot([AuthEffects, QuestionsEffects, ExamsEffects, ConsumersEffects, StatisticsEffects]),
    StoreRouterConnectingModule.forRoot(),
    !environment.production && StoreDevtoolsModule.instrument({logOnly: environment.production}),
    BrowserAnimationsModule,
    material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
