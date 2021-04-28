import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators} from '@angular/forms';
import {QuestionType} from '../../../models/enum/question-type.enum';
import {ResizedEvent} from 'angular-resize-event';
import {AppState} from '../../../store/app.reducer';
import {Store} from '@ngrx/store';
import {FormatterService} from '../../../shared/util/formatter.service';
import {Subscription} from 'rxjs';
import {selectQuestionsFeature} from '../../../store/app.selectors';
import {addQuestionStart} from '../../store/questions.actions';

@Component({
  selector: 'app-question-manage',
  templateUrl: './question-manage.component.html',
  styleUrls: ['./question-manage.component.scss']
})
export class QuestionManageComponent implements OnInit, OnDestroy {
  questionTypes = Object.values(QuestionType);
  questionType = QuestionType;
  rightColumnMaxHeight: number;
  questionForm: FormGroup;
  @ViewChild('formElement') formElement: FormGroupDirective;
  formatter = this.formatterService;
  errorMessage: string;
  loading: boolean;
  private questionsSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private formatterService: FormatterService) {
  }

  get answersControls(): FormArray {
    return (this.questionForm.get('answers') as FormArray);
  }

  private static answersValidator(): ValidatorFn {
    return (formGroup: FormGroup): { [key: string]: any } | null => {
      const selectedAnswersCount = (formGroup.get('answers') as FormArray).controls
        .reduce((acc, currValue) => acc + currValue.get('rightAnswer').value, 0);
      const questionType = formGroup.get('type').value;
      let error = null;
      if (QuestionType.SINGLE_CHOICE === questionType || QuestionType.MULTIPLE_CHOICE === questionType) {
        error = selectedAnswersCount === 0 ? {noAnswerSelected: 'At least one correct answer must be selected'} : null;
      }
      return error;
    };
  }

  ngOnInit(): void {
    this.initForm();
    this.questionsSubscription = this.store.select(selectQuestionsFeature)
      .subscribe(questionsState => {
        this.errorMessage = questionsState.addQuestionErrorMessage;
        this.loading = questionsState.addQuestionLoading;
      });
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      this.store.dispatch(addQuestionStart(this.questionForm.value));
      this.onCancel();
    }
  }

  onCancel(): void {
    this.questionForm.reset();
    this.formElement.resetForm();
  }

  // used for smart scroll on right column
  onLeftColumnResized(event: ResizedEvent): void {
    this.rightColumnMaxHeight = event.newHeight;
  }

  onAddAnswer(): void {
    this.answersControls.push(new FormGroup({
      text: new FormControl('', Validators.required),
      rightAnswer: new FormControl(false),
    }));
  }

  onDeleteAnswer(index: number): void {
    this.answersControls.removeAt(index);
  }

  radioChanged(index: number): void {
    this.answersControls.controls
      .forEach((answerCtrl, i) => answerCtrl.patchValue({rightAnswer: index === i}));
  }

  onQuestionTypeSelectionChanged(): void {
    this.answersControls.controls
      .forEach((answerCtrl, i) => answerCtrl.patchValue({rightAnswer: false}));
  }

  ngOnDestroy(): void {
    this.questionsSubscription?.unsubscribe();
  }

  private initForm(): void {
    this.questionForm = new FormGroup({
      text: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      answers: new FormArray([
        new FormGroup({
          text: new FormControl('', Validators.required),
          rightAnswer: new FormControl(false),
        })
      ])
    }, QuestionManageComponent.answersValidator());
  }
}
