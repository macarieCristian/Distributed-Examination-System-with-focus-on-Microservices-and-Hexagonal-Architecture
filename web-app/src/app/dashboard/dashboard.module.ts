import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamComponent} from './exam/exam.component';
import {ExamManageComponent} from './exam/exam-manage/exam-manage.component';
import {QuestionListComponent} from './question/question-list/question-list.component';
import {QuestionManageComponent} from './question/question-manage/question-manage.component';
import {ExamListComponent} from './exam/exam-list/exam-list.component';
import {QuestionComponent} from './question/question.component';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MatListModule} from '@angular/material/list';
import { QuestionItemContentComponent } from './question/question-list/question-item-content/question-item-content.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import { StatisticComponent } from './statistic/statistic.component';
import {GoogleChartsModule} from 'angular-google-charts';
import { ExamStatisticListComponent } from './statistic/exam-statistic-list/exam-statistic-list.component';
import { QuestionStatisticListComponent } from './statistic/question-statistic-list/question-statistic-list.component';
import {MatBadgeModule} from '@angular/material/badge';
import { QuestionStatisticsListItemComponent } from './statistic/question-statistic-list/question-statistics-list-item/question-statistics-list-item.component';

const material = [MatListModule, MatBadgeModule];

@NgModule({
  declarations: [
    ExamComponent,
    ExamManageComponent,
    QuestionListComponent,
    QuestionManageComponent,
    ExamListComponent,
    QuestionComponent,
    DashboardComponent,
    QuestionItemContentComponent,
    StatisticComponent,
    ExamStatisticListComponent,
    QuestionStatisticListComponent,
    QuestionStatisticsListItemComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    material,
    AngularResizedEventModule,
    GoogleChartsModule.forRoot()
  ]
})
export class DashboardModule {
}
