import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ExamAnswerDto} from '../../dtos/exam.answer.dto';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) {
  }

  getAllUserExamAnswersByOwner(): Observable<ExamAnswerDto[]> {
    return this.http.get<ExamAnswerDto[]>(`${environment.baseUrl}/api/consumers/exams/answers`, {withCredentials: true});
  }
}
