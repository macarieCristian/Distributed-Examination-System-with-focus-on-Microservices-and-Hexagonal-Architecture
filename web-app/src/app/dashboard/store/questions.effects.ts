import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, delay, map, switchMap} from 'rxjs/operators';
import {addQuestionFailed, addQuestionStart, loadQuestionsFailed, loadQuestionsStart, loadQuestionsSuccess} from './questions.actions';
import {QuestionsService} from '../service/questions.service';
import {StoreUtils} from '../../store/store-utils';

@Injectable()
export class QuestionsEffects {
  loadQuestionsStart = createEffect(
    () => this.actions$
      .pipe(
        ofType(loadQuestionsStart),
        delay(500),
        switchMap(() => this.questionsService.getAllQuestionsByUser()
          .pipe(
            map((questions) => loadQuestionsSuccess(questions)),
            catchError(errorRes => StoreUtils.handleEffectError(errorRes, loadQuestionsFailed))
          )
        )
      )
  );

  addQuestionStart = createEffect(
    () => this.actions$
      .pipe(
        ofType(addQuestionStart),
        delay(250),
        switchMap(({question}) => this.questionsService.createQuestion(question)
          .pipe(
            map(() => ({type: 'NOT_EXISTING'})),
            catchError(errorRes => StoreUtils.handleEffectError(errorRes, addQuestionFailed))
          )
        )
      )
  );

  constructor(private actions$: Actions,
              private questionsService: QuestionsService) {
  }
}
