import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {selectExamQuestions, selectExamsFeature} from '../../store/app.selectors';
import {Exam} from '../../models/exam.model';
import {mergeMap, tap} from 'rxjs/operators';
import {Question} from '../../models/question.model';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit, OnDestroy {
  exams: Exam[] = [];
  selectedExamId: string;
  selectedExamQuestions: Question[];
  errorMessage: string;
  loading: boolean;
  private examsSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
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
