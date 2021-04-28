import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConsumersService} from '../service/consumers.service';
import {Observable, Subscription} from 'rxjs';
import {Exam, ExamHeader} from '../../models/exam.model';
import {ComponentWithPendingChanges} from '../guard/pending-changes.guard';
import {selectConsumersFeature, selectExamHeaderByUuid} from '../../store/app.selectors';
import {AppState} from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {QuestionType} from '../../models/enum/question-type.enum';
import {FormArray, FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {clearActiveExam, loadActiveExamStart, submitExamStart} from '../store/consumers.actions';
import {omit} from 'lodash';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-consumer-exam',
  templateUrl: './consumer-exam.component.html',
  styleUrls: ['./consumer-exam.component.scss']
})
export class ConsumerExamComponent implements OnInit, ComponentWithPendingChanges, OnDestroy {
  remainingTime: Observable<number>;
  selectedExamId: string;
  exam: ExamHeader;
  activeExam: Exam;
  questionType = QuestionType;
  loading: boolean;
  errorMessage: string;
  submitExamLoading: boolean;
  submitExamErrorMessage: string;
  @ViewChild('formElement') formElement: FormGroupDirective;
  testForm: FormGroup;
  private activeExamSubscription: Subscription;
  private examHeaderSubscription: Subscription;

  constructor(private consumersService: ConsumersService,
              private store: Store<AppState>,
              private route: ActivatedRoute) {
  }

  get questionsControls(): FormArray {
    return (this.testForm.get('questions') as FormArray);
  }

  private static questionValidator(): ValidatorFn {
    return (formGroup: FormGroup): { [key: string]: any } | null => {
      const questionType: QuestionType = formGroup.get('type').value;
      if (!questionType || QuestionType.FREE_TEXT === questionType) {
        return null;
      }
      const selectedAnswersCount = (formGroup.get('answers') as FormArray).controls
        .reduce((acc, currValue) => acc + currValue.get('checked').value, 0);
      let error = null;
      if (QuestionType.SINGLE_CHOICE === questionType || QuestionType.MULTIPLE_CHOICE === questionType) {
        error = selectedAnswersCount === 0 ? {noAnswerSelected: 'At least one answer must be selected'} : null;
      }
      return error;
    };
  }

  getAnswersControls(answerControlIndex: number): FormArray {
    return ((this.testForm.get('questions') as FormArray).at(answerControlIndex).get('answers') as FormArray);
  }

  ngOnInit(): void {
    this.remainingTime = this.consumersService.timeValue.asObservable();
    this.examHeaderSubscription = this.route.params
      .pipe(
        tap(params => this.selectedExamId = params.id),
        switchMap(() => this.store.select(selectExamHeaderByUuid(this.selectedExamId))))
      .subscribe(examHeader => this.exam = examHeader);
    this.activeExamSubscription = this.store.select(selectConsumersFeature)
      .subscribe(consumersState => {
        this.activeExam = consumersState.activeExam;
        this.loading = consumersState.loadActiveExamLoading;
        this.errorMessage = consumersState.loadActiveExamErrorMessage;
        this.submitExamLoading = consumersState.submitExamLoading;
        this.submitExamErrorMessage = consumersState.submitExamErrorMessage;
        if (this.activeExam) {
          this.initForm(this.activeExam);
        }
      });
  }

  formatTimeLabel(value: number): string {
    const date = new Date(0);
    date.setSeconds(value);
    return `${date.toISOString().substr(11, 8)}`;
  }

  startExam(): void {
    this.store.dispatch(loadActiveExamStart(this.selectedExamId));
    this.consumersService.setTimer(this.exam.duration * 60);
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean | Observable<boolean> {
    return !this.activeExam;
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearActiveExam());
    this.examHeaderSubscription?.unsubscribe();
    this.activeExamSubscription?.unsubscribe();
    this.consumersService.clearTimer();
  }

  onSubmit(): void {
    if (this.testForm.valid) {
      this.store.dispatch(submitExamStart({
        ...this.testForm.value,
        questions: this.testForm.value.questions?.map(question => omit(question, 'type')),
        startedAt: this.consumersService.startedAt
      }));
      this.onCancel();
    }
  }

  onCancel(): void {
    this.testForm.reset();
    this.formElement.resetForm();
  }

  radioChanged(questionIndex: number, answerIndex: number): void {
    this.getAnswersControls(questionIndex).controls
      .forEach((answerCtrl, i) => answerCtrl.patchValue({checked: answerIndex === i}));
  }

  private initForm(exam: Exam): void {
    this.testForm = new FormGroup({
      examUuid: new FormControl(exam.uuid),
      ownerUuid: new FormControl(exam.ownerUuid),
      questions: new FormArray(exam?.questions?.map(question =>
        new FormGroup({
          uuid: new FormControl(question.uuid),
          ownerUuid: new FormControl(question.ownerUuid),
          type: new FormControl(question.type),
          answers: new FormArray(question.answers.map(answer =>
            new FormGroup({
              uuid: new FormControl(answer.uuid),
              ...(question.type === QuestionType.FREE_TEXT ?
                {value: new FormControl('', Validators.required)} :
                {checked: new FormControl(false)})
            })
          ))
        }, ConsumerExamComponent.questionValidator())
      ))
    });
  }
}
