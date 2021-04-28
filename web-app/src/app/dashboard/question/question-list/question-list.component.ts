import {Component, Input, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { cloneDeep } from 'lodash';
import {QuestionType} from '../../../models/enum/question-type.enum';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent {
  @Input() selectedQuestionId: string;
  @Input() defaultComponent?: boolean;
  @Input() errorMessage: string;
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
