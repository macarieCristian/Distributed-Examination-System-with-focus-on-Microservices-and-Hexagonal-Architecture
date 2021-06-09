import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Exam} from '../../../models/exam.model';
import {ResizedEvent} from 'angular-resize-event';
import {QuestionStatisticListComponent} from '../question-statistic-list/question-statistic-list.component';
import {AppState} from '../../../store/app.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {Question} from '../../../models/question.model';
import {selectQuestionsFeature} from '../../../store/app.selectors';
import {ActivatedRoute} from '@angular/router';
import {StatisticType} from '../../../models/enum/statistic-type';

@Component({
  selector: 'app-exam-statistic-list',
  templateUrl: './exam-statistic-list.component.html',
  styleUrls: ['./exam-statistic-list.component.scss']
})
export class ExamStatisticListComponent implements OnInit, OnDestroy {
  @Input() exams: Exam[];
  @Input() selectedExamQuestions: Question[];
  @Input() selectedExamId: string;
  @Input() errorMessage: string;

  statisticsType: StatisticType;
  statisticTypeEnum = StatisticType;

  questionsErrorMessage: string;
  questionsLoading: boolean;

  rightColumnMaxHeight: number;
  @ViewChild(QuestionStatisticListComponent) questionStatisticListComponent: QuestionStatisticListComponent;

  private questionsSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) {
  }

  // used for smart scroll on right column
  onLeftColumnResized(event: ResizedEvent): void {
    this.rightColumnMaxHeight = event.newHeight;
  }

  ngOnInit(): void {
    this.questionsSubscription = this.store.select(selectQuestionsFeature)
      .subscribe(questionsState => {
        this.questionsErrorMessage = questionsState.loadQuestionsErrorMessage;
        this.questionsLoading = questionsState.loadQuestionsLoading;
      });
    this.routeSubscription = this.route.queryParams
      .subscribe(params => this.statisticsType = params.statistics);
  }

  ngOnDestroy(): void {
    this.questionsSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}
