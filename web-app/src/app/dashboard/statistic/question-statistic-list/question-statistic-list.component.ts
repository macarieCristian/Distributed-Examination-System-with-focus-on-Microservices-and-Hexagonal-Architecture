import {Component, Input, ViewChild} from '@angular/core';
import {Question} from '../../../models/question.model';
import {MatAccordion} from '@angular/material/expansion';
import {QuestionType} from '../../../models/enum/question-type.enum';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-question-statistic-list',
  templateUrl: './question-statistic-list.component.html',
  styleUrls: ['./question-statistic-list.component.scss']
})
export class QuestionStatisticListComponent {
  @Input() selectedExamId: string;
  @Input() questionsErrorMessage: string;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  questionType = QuestionType;

  // tslint:disable-next-line:variable-name
  private _questions: Question[];

  get questions(): Question[] {
    return this._questions;
  }

  @Input() set questions(questions: Question[]) {
    this._questions = cloneDeep(questions);
  }

  openAll(): void {
    this.accordion.openAll();
  }

  closeAll(): void {
    this.accordion.closeAll();
  }
}
