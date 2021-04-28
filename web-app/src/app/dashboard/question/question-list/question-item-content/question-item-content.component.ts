import {Component, Input, OnInit} from '@angular/core';
import {QuestionType} from '../../../../models/enum/question-type.enum';
import {Question} from '../../../../models/question.model';

@Component({
  selector: 'app-question-item-content',
  templateUrl: './question-item-content.component.html',
  styleUrls: ['./question-item-content.component.scss']
})
export class QuestionItemContentComponent implements OnInit {
  @Input() question: Question;
  questionType = QuestionType;

  constructor() {
  }

  ngOnInit(): void {
  }

}
