import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ResizedEvent} from 'angular-resize-event';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import {Subscription} from 'rxjs';
import {selectExamsFeature, selectQuestionsFeature} from '../../../store/app.selectors';
import {Question} from '../../../models/question.model';
import {QuestionType} from '../../../models/enum/question-type.enum';
import {AbstractControl, FormArray, FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {isEmpty} from 'lodash';
import {Exam} from '../../../models/exam.model';
import {addExamStart} from '../../store/exams.actions';

@Component({
  selector: 'app-exam-manage',
  templateUrl: './exam-manage.component.html',
  styleUrls: ['./exam-manage.component.scss']
})
export class ExamManageComponent implements OnInit, OnDestroy {
  rightColumnMaxHeight: number;
  questions: Question[] = [];
  questionType = QuestionType;
  examForm: FormGroup;
  @ViewChild('formElement') formElement: FormGroupDirective;
  errorMessage: string;
  loading: boolean;
  addExamErrorMessage: string;
  addExamLoading: boolean;
  private questionsSubscription: Subscription;
  private examsSubscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  get examQuestionsControls(): FormArray {
    return (this.examForm.get('examQuestions') as FormArray);
  }

  private static cleanUpCustomErrors(examQuestionCtrl: AbstractControl): void {
    const weightCtrl = examQuestionCtrl.get('weight');
    delete weightCtrl.errors?.required;
    delete weightCtrl.errors?.reevaluate;
    weightCtrl.setErrors(isEmpty(weightCtrl.errors) ? null : weightCtrl.errors);
  }

  private static examQuestionsValidator(): ValidatorFn {
    return (formGroup: FormGroup): { [key: string]: any } | null => {
      const selectedExamQuestionsCtrl: AbstractControl[] = [];
      let totalWeight = 0;
      (formGroup.get('examQuestions') as FormArray).controls.forEach(examQuestionCtrl => {
        if (!!examQuestionCtrl.get('questionUuid').value) {
          selectedExamQuestionsCtrl.push(examQuestionCtrl);
          totalWeight += examQuestionCtrl.get('weight').value || 0;
        }
        ExamManageComponent.cleanUpCustomErrors(examQuestionCtrl);
      });
      if (isEmpty(selectedExamQuestionsCtrl)) {
        return {noQuestionSelected: 'At least one question must be selected'};
      }
      if (totalWeight !== 100) {
        selectedExamQuestionsCtrl.forEach(examQuestionCtrl => {
          const weightCtrl = examQuestionCtrl.get('weight');
          if (weightCtrl.value === null) {
            weightCtrl.setErrors({required: 'Required'});
          } else if (isEmpty(weightCtrl.errors)) {
            weightCtrl.setErrors({reevaluate: 'Please re-evaluate'});
          }
        });
        return {invalidTotalWeight: 'The sum of all weights should be 100'};
      }
      return null;
    };
  }

  private static examQuestionsWeightsValidator(min: number, max: number): ValidatorFn {
    return (formArray: FormArray): { [key: string]: any } | null => {
      formArray.controls.forEach(examQuestionCtrl => {
        const weightCtrl = examQuestionCtrl.get('weight');
        delete weightCtrl.errors?.min;
        delete weightCtrl.errors?.max;
        weightCtrl.setErrors(isEmpty(weightCtrl.errors) ? null : weightCtrl.errors);
        if (!!examQuestionCtrl.get('questionUuid').value) {
          if (weightCtrl.value > max) {
            weightCtrl.setErrors({max: {max}});
          }
          if (weightCtrl.value < min) {
            weightCtrl.setErrors({min: {min}});
          }
        }
      });
      return null;
    };
  }

  ngOnInit(): void {
    this.questionsSubscription = this.store.select(selectQuestionsFeature)
      .subscribe(questionsState => {
        this.questions = Object.values(questionsState.questions);
        this.loading = questionsState.loadQuestionsLoading;
        this.errorMessage = questionsState.loadQuestionsErrorMessage;
        this.initForm(this.questions.length);
      });
    this.examsSubscription = this.store.select(selectExamsFeature)
      .subscribe(examsState => {
        this.addExamErrorMessage = examsState.addExamErrorMessage;
        this.addExamLoading = examsState.addExamLoading;
      });
  }

  onSubmit(): void {
    if (this.examForm.valid) {
      const examFormValue = this.examForm.value as Exam;
      const exam: Exam = {
        ...(examFormValue),
        examQuestions: examFormValue.examQuestions.filter(examQuestion => !!examQuestion.questionUuid)
      };
      this.store.dispatch(addExamStart(exam));
      this.onCancel();
    }
  }

  onCancel(): void {
    this.examForm.reset();
    this.formElement.resetForm();
  }

  ngOnDestroy(): void {
    this.questionsSubscription?.unsubscribe();
    this.examsSubscription?.unsubscribe();
  }

  // used for smart scroll on right column
  onLeftColumnResized(event: ResizedEvent): void {
    this.rightColumnMaxHeight = event.newHeight;
  }

  formatLabel(value: number): string {
    const hours = Math.trunc(value / 60);
    const minutes = value % 60;
    return hours > 0 ?
      minutes > 0 ? `${hours}h${minutes}m` : `${hours}h`
      : `${minutes}m`;
  }

  onQuestionSelectionChange(event: MatCheckboxChange, questionUuid: string, index: number): void {
    const examQuestionCtrl = this.examQuestionsControls.controls[index];
    if (event.checked) {
      examQuestionCtrl.patchValue({questionUuid});
    } else {
      examQuestionCtrl.patchValue({questionUuid: null});
      examQuestionCtrl.setErrors(null);
    }
  }

  private initForm(questionsNumber: number): void {
    this.examForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      duration: new FormControl(null, Validators.required),
      examQuestions: new FormArray(
        Array.from(new Array(questionsNumber), () => new FormGroup({
          questionUuid: new FormControl(null),
          weight: new FormControl(null),
        })), ExamManageComponent.examQuestionsWeightsValidator(1, 100)
      )
    }, ExamManageComponent.examQuestionsValidator());
  }
}
