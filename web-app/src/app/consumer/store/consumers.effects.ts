import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, delay, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {StoreUtils} from '../../store/store-utils';
import {ConsumersService} from '../service/consumers.service';
import {
  clearActiveExam,
  loadActiveExamFailed,
  loadActiveExamStart,
  loadActiveExamSuccess,
  loadExamHeadersFailed,
  loadExamHeadersStart,
  loadExamHeadersSuccess,
  redirect,
  submitExamFailed,
  submitExamStart, submitExamSuccess
} from './consumers.actions';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ExamsService} from '../../dashboard/service/exams.service';

@Injectable()
export class ConsumersEffects {
  loadExamHeadersStart = createEffect(
    () => this.actions$
      .pipe(
        ofType(loadExamHeadersStart),
        delay(250),
        switchMap(() => this.examsService.getConsumerAvailableExamsHeader()
          .pipe(
            map((examHeaders) => loadExamHeadersSuccess(examHeaders)),
            catchError(errorRes => StoreUtils.handleEffectError(errorRes, loadExamHeadersFailed))
          )
        )
      )
  );

  loadActiveExamStart = createEffect(
    () => this.actions$
      .pipe(
        ofType(loadActiveExamStart),
        delay(250),
        switchMap(({examUuid}) => this.examsService.getConsumerAvailableExam(examUuid)
          .pipe(
            map((exam) => loadActiveExamSuccess(exam)),
            catchError(errorRes => StoreUtils.handleEffectError(errorRes, loadActiveExamFailed))
          )
        )
      )
  );

  submitExamStart = createEffect(
    () => this.actions$
      .pipe(
        ofType(submitExamStart),
        delay(250),
        switchMap(({examAnswer}) => this.consumersService.createExamAnswer(examAnswer)
          .pipe(
            tap(() => {
              this.toastrService.success('Your answers were successfully submitted!', 'Exam Done');
              this.consumersService.clearTimer();
            }),
            mergeMap(() => [clearActiveExam(), submitExamSuccess(), redirect('/consumer/exam')]),
            catchError(errorRes => StoreUtils.handleEffectError(errorRes, submitExamFailed))
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

  constructor(private actions$: Actions,
              private consumersService: ConsumersService,
              private examsService: ExamsService,
              private toastrService: ToastrService,
              private router: Router) {
  }
}
