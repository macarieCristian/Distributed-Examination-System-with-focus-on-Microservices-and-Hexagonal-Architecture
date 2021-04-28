import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ExamAnswerDto} from '../../dtos/exam.answer.dto';

@Injectable({
  providedIn: 'root'
})
export class ConsumersService {
  timeValue = new Subject<number>();
  startedAt: number;
  private timer: any;

  constructor(private http: HttpClient) {
  }

  createExamAnswer(examAnswer: ExamAnswerDto): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/consumers/exams/answer`, examAnswer, {withCredentials: true});
  }

  setTimer(time: number): void {
    this.startedAt = Date.now();
    this.timeValue.next(time);
    this.timer = setInterval(() => {
      time--;
      this.timeValue.next(time);
      if (time <= 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  clearTimer(): void {
    this.startedAt = undefined;
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = null;
  }
}
