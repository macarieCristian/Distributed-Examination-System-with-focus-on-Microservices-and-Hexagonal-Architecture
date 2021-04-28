import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, delay, map, switchMap} from 'rxjs/operators';
import {addExamFailed, addExamStart, loadExamsFailed, loadExamsStart, loadExamsSuccess} from './exams.actions';
import {ExamsService} from '../service/exams.service';
import {StoreUtils} from '../../store/store-utils';

@Injectable()
export class ExamsEffects {
  loadExamsStart = createEffect(
    () => this.actions$
      .pipe(
        ofType(loadExamsStart),
        delay(250),
        switchMap(() => this.examsService.getAllExamsByUser()
          .pipe(
            map((exams) => loadExamsSuccess(exams)),
            catchError(errorRes => StoreUtils.handleEffectError(errorRes, loadExamsFailed))
          )
        )
      )
  );

  addExamStart = createEffect(
    () => this.actions$
      .pipe(
        ofType(addExamStart),
        delay(250),
        switchMap(({exam}) => this.examsService.createExam(exam)
          .pipe(
            map(() => ({type: 'NOT_EXISTING'})),
            catchError(errorRes => StoreUtils.handleEffectError(errorRes, addExamFailed))
          )
        )
      )
  );

  constructor(private actions$: Actions,
              private examsService: ExamsService) {
  }
}
