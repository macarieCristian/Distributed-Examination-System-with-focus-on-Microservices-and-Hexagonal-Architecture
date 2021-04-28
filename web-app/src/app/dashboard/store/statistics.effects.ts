import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, delay, map, switchMap} from 'rxjs/operators';
import {StoreUtils} from '../../store/store-utils';
import {loadExamAnswersFailed, loadExamAnswersStart, loadExamAnswersSuccess} from './statistics.actions';
import {StatisticsService} from '../service/statistics.service';

@Injectable()
export class StatisticsEffects {
  loadExamAnswersStart = createEffect(
    () => this.actions$
      .pipe(
        ofType(loadExamAnswersStart),
        delay(250),
        switchMap(() => this.statisticsService.getAllUserExamAnswersByOwner()
          .pipe(
            map((examAnswers) => loadExamAnswersSuccess(examAnswers)),
            catchError(errorRes => StoreUtils.handleEffectError(errorRes, loadExamAnswersFailed))
          )
        )
      )
  );

  constructor(private actions$: Actions,
              private statisticsService: StatisticsService) {
  }
}
