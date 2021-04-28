import {Injectable} from '@angular/core';
import {QuestionType} from '../../models/enum/question-type.enum';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  constructor() {
  }

  formatQuestionType(questionType: QuestionType): string {
    switch (questionType) {
      case QuestionType.FREE_TEXT:
        return 'Free text';
      case QuestionType.MULTIPLE_CHOICE:
        return 'Multiple choice';
      case QuestionType.SINGLE_CHOICE:
        return 'Single choice';
      default:
        return questionType;
    }
  }
}
