import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {ChartType, Column, Row} from 'angular-google-charts';
import {selectExamGradesByExamUuid} from '../../../store/app.selectors';
import {Subscription} from 'rxjs';
import {isEmpty} from 'lodash';
import {ExamGrade} from '../../../models/exam-grade.model';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-grade-statistic',
  templateUrl: './grade-statistic.component.html',
  styleUrls: ['./grade-statistic.component.scss']
})
export class GradeStatisticComponent implements OnInit, OnDestroy {
  chartData: Row[];
  chartColumns: Column[] = ['Grade', 'Count'];
  chartType = ChartType;
  chartTitle = 'Grades';
  chartOptions = {
    hAxis: {format: '0', viewWindowMode: 'pretty'},
    legend: {position: 'none'},
    curveType: 'function',
  };
  private subscription: Subscription;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      switchMap(params => this.store.select(selectExamGradesByExamUuid(params.id)))
    )
      .subscribe(examGrades => {
        if (!isEmpty(examGrades)) {
          const result = [];
          const gradeFrequency = this.computeGradeFrequency(examGrades);

          for (const grade of Object.keys(gradeFrequency)) {
            result.push([grade, gradeFrequency[grade]]);
          }
          this.chartData = isEmpty(result) ? undefined : result;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private computeGradeFrequency(examGrades: ExamGrade[]): { [grade: number]: number } {
    const gradeFrequency: { [grade: number]: number } = {};
    examGrades.forEach(examGrade => {
      if (examGrade.grade !== undefined) {
        gradeFrequency[examGrade.grade] = (gradeFrequency[examGrade.grade] || 0) + 1;
      }
    });
    return gradeFrequency;
  }

}
