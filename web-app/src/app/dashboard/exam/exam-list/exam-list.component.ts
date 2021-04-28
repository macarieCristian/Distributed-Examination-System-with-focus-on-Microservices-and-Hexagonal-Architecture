import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Exam} from '../../../models/exam.model';
import {Question} from '../../../models/question.model';
import {ResizedEvent} from 'angular-resize-event';
import {QuestionListComponent} from '../../question/question-list/question-list.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {Subscription} from 'rxjs';
import {selectQuestionsFeature} from '../../../store/app.selectors';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit, OnDestroy {
  @Input() exams: Exam[];
  @Input() selectedExamId: string;
  @Input() selectedExamQuestions: Question[];
  @Input() errorMessage: string;
  rightColumnMaxHeight: number;
  @ViewChild(QuestionListComponent) questionListComponent: QuestionListComponent;
  questionsErrorMessage: string;
  questionsLoading: boolean;
  private questionsSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.questionsSubscription = this.store.select(selectQuestionsFeature)
      .subscribe(questionsState => {
        this.questionsErrorMessage = questionsState.loadQuestionsErrorMessage;
        this.questionsLoading = questionsState.loadQuestionsLoading;
      });
  }

  // used for smart scroll on right column
  onLeftColumnResized(event: ResizedEvent): void {
    this.rightColumnMaxHeight = event.newHeight;
  }

  formatTimeLabel(value: number): string {
    const hours = Math.trunc(value / 60);
    const minutes = value % 60;
    return hours > 0 ?
      minutes > 0 ? `${hours}h${minutes}m` : `${hours}h`
      : `${minutes}m`;
  }

  ngOnDestroy(): void {
    this.questionsSubscription?.unsubscribe();
  }

}
