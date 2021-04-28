import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExamComponent} from './exam/exam.component';
import {DashboardComponent} from './dashboard.component';
import {QuestionComponent} from './question/question.component';
import {ExamManageComponent} from './exam/exam-manage/exam-manage.component';
import {QuestionManageComponent} from './question/question-manage/question-manage.component';
import {StatisticComponent} from './statistic/statistic.component';
import {canActivateWithRole} from '../auth/guard/role-auth.guard';
import {UserRole} from '../models/enum/user-role.enum';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, ...canActivateWithRole(UserRole.ADMIN),
    children: [
      {path: '', redirectTo: 'exam/', pathMatch: 'full'},
      {path: 'exam', redirectTo: 'exam/', pathMatch: 'full'},
      {path: 'exam/:id', component: ExamComponent},
      {path: 'exam-new', component: ExamManageComponent},
      {path: 'question', redirectTo: 'question/', pathMatch: 'full'},
      {path: 'question/:id', component: QuestionComponent},
      {path: 'question-new', component: QuestionManageComponent},
      {path: 'statistic', redirectTo: 'statistic/exam/', pathMatch: 'full'},
      {path: 'statistic/exam', redirectTo: 'statistic/exam/', pathMatch: 'full'},
      {path: 'statistic/exam/:id', component: StatisticComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
