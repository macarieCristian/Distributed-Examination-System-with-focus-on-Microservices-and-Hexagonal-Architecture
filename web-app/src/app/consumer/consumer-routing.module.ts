import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConsumerComponent} from './consumer.component';
import {ConsumerExamGridComponent} from './consumer-exam-grid/consumer-exam-grid.component';
import {ConsumerExamComponent} from './consumer-exam/consumer-exam.component';
import {PendingChangesGuard} from './guard/pending-changes.guard';
import {canActivateWithRole} from '../auth/guard/role-auth.guard';
import {UserRole} from '../models/enum/user-role.enum';

const routes: Routes = [
  {
    path: '', component: ConsumerComponent, ...canActivateWithRole(UserRole.USER),
    children: [
      {path: '', redirectTo: 'exam', pathMatch: 'full'},
      {path: 'exam', component: ConsumerExamGridComponent},
      {path: 'exam/:id', component: ConsumerExamComponent, canDeactivate: [PendingChangesGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerRoutingModule {
}
