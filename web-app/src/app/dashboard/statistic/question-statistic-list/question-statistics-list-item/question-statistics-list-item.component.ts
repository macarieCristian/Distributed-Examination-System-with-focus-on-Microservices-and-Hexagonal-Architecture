import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Question} from '../../../../models/question.model';
import {ChartType, Column, Row} from 'angular-google-charts';
import {AppState} from '../../../../store/app.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {selectExamAnswerQuestionByExamUuidAndQuestionUuid} from '../../../../store/app.selectors';

@Component({
  selector: 'app-question-statistics-list-item',
  templateUrl: './question-statistics-list-item.component.html',
  styleUrls: ['./question-statistics-list-item.component.scss']
})
export class QuestionStatisticsListItemComponent implements OnInit, OnDestroy {
  @Input() selectedExamId: string;
  @Input() question: Question;
  chartData: Row[];
  chartColumns: Column[];
  chartType = ChartType;
  chartTitle = 'Answers Count';
  chartOptions = {
    hAxis: {format: '0', viewWindowMode: 'pretty', minValue: 0},
    legend: {position: 'none'}
  };
  private questionAnswersSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.questionAnswersSubscription = this.store
      .select(selectExamAnswerQuestionByExamUuidAndQuestionUuid(this.selectedExamId, this.question.uuid))
      .subscribe(examAnswerQuestion => {
        if (examAnswerQuestion) {
          const result = [];
          this.question?.answers?.forEach(answer => {
            result.push([
              answer.text,
              examAnswerQuestion?.answers?.[answer.uuid]?.count,
              answer.rightAnswer ? 'green' : '#3366cc'
            ]);
          });
          this.chartData = result;
          this.chartColumns = ['Answer', 'Count', {role: 'style'}];
        }
      });
  }

  ngOnDestroy(): void {
    this.questionAnswersSubscription?.unsubscribe();
  }
}
