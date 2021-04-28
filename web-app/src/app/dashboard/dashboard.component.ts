import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebsocketService} from '../shared/service/websocket.service';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {Subscription} from 'rxjs';
import {WebsocketMessageType} from '../models/enum/websocket-message-type';
import {addQuestionSuccess, loadQuestionsStart} from './store/questions.actions';
import {ToastrService} from 'ngx-toastr';
import {Question} from '../models/question.model';
import {take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Exam} from '../models/exam.model';
import {addExamSuccess, loadExamsStart} from './store/exams.actions';
import {addExamAnswer, loadExamAnswersStart} from './store/statistics.actions';
import {ExamAnswerDto} from '../dtos/exam.answer.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private websocketQuestionsSubscription: Subscription;
  private websocketExamsSubscription: Subscription;
  private websocketExamsAnswersSubscription: Subscription;

  constructor(private websocketService: WebsocketService,
              private store: Store<AppState>,
              private toastrService: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadExamsStart());
    this.store.dispatch(loadQuestionsStart());
    this.store.dispatch(loadExamAnswersStart());
    this.websocketQuestionsSubscription = this.websocketService.questions
      .subscribe(message => {
        switch (message.type) {
          case WebsocketMessageType.QUESTION_ADD_SUCCESS:
            const question: Question = message.payload;
            this.store.dispatch(addQuestionSuccess(question));
            this.toastrService.success('Question added successfully.', 'Questions').onTap
              .pipe(take(1))
              .subscribe(() => this.router.navigate(['question', question.uuid], {relativeTo: this.route}));
            break;
        }
      });
    this.websocketExamsSubscription = this.websocketService.exams
      .subscribe(message => {
        switch (message.type) {
          case WebsocketMessageType.EXAM_ADD_SUCCESS:
            const exam: Exam = message.payload;
            this.store.dispatch(addExamSuccess(exam));
            this.toastrService.success('Exam added successfully.', 'Exams').onTap
              .pipe(take(1))
              .subscribe(() => this.router.navigate(['exam', exam.uuid], {relativeTo: this.route}));
            break;
        }
      });
    this.websocketExamsAnswersSubscription = this.websocketService.examsAnswers
      .subscribe(message => {
        switch (message.type) {
          case WebsocketMessageType.EXAMS_ANSWERS_ADD_SUCCESS:
            const examAnswer: ExamAnswerDto = message.payload;
            this.store.dispatch(addExamAnswer(examAnswer));
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.websocketQuestionsSubscription?.unsubscribe();
    this.websocketExamsSubscription?.unsubscribe();
    this.websocketExamsAnswersSubscription?.unsubscribe();
  }

}
