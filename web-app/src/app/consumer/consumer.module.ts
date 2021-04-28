import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsumerRoutingModule} from './consumer-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ConsumerComponent} from './consumer.component';
import {ConsumerExamGridComponent} from './consumer-exam-grid/consumer-exam-grid.component';
import {ConsumerExamComponent} from './consumer-exam/consumer-exam.component';
import {MatCardModule} from '@angular/material/card';

const material = [
  MatCardModule
];

@NgModule({
  declarations: [ConsumerComponent, ConsumerExamGridComponent, ConsumerExamComponent],
  imports: [
    CommonModule,
    ConsumerRoutingModule,
    SharedModule,
    material
  ]
})
export class ConsumerModule {
}
