import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../models/question.model';
import {AppState} from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {selectQuestionsFeature} from '../../store/app.selectors';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  selectedQuestionId: string;
  errorMessage: string;
  loading: boolean;
  private questionsSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.questionsSubscription = this.route.params.pipe(
      tap(params => this.selectedQuestionId = params.id),
      switchMap(() => this.store.select(selectQuestionsFeature))
    )
      .subscribe(questionsState => {
        this.questions = Object.values(questionsState.questions);
        this.errorMessage = questionsState.loadQuestionsErrorMessage;
        this.loading = questionsState.loadQuestionsLoading;
      });
  }

  ngOnDestroy(): void {
    this.questionsSubscription?.unsubscribe();
  }

}
