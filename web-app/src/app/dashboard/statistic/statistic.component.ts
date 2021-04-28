import {Component, OnDestroy, OnInit} from '@angular/core';
import {Exam} from '../../models/exam.model';
import {combineLatest, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {selectExamQuestions, selectExamsFeature} from '../../store/app.selectors';
import {mergeMap, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../models/question.model';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit, OnDestroy {
  exams: Exam[];
  selectedExamQuestions: Question[];
  selectedExamId: string;
  errorMessage: string;
  loading: boolean;
  private examsSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.examsSubscription = this.route.params.pipe(
      tap(params => this.selectedExamId = params.id),
      mergeMap(params => combineLatest([
        this.store.select(selectExamsFeature),
        this.store.select(selectExamQuestions(params.id)),
      ]))
    ).subscribe(([examsState, questions]) => {
      this.exams = Object.values(examsState.exams);
      this.errorMessage = examsState.loadExamsErrorMessage;
      this.loading = examsState.loadExamsLoading;
      this.selectedExamQuestions = questions;
    });
  }

  ngOnDestroy(): void {
    this.examsSubscription?.unsubscribe();
  }

}
