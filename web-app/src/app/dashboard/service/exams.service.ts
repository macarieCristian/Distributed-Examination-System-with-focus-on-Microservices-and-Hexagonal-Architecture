import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Exam, ExamHeader} from '../../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(private http: HttpClient) {
  }

  getAllExamsByUser(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${environment.baseUrl}/api/exams`, {withCredentials: true});
  }

  createExam(exam: Exam): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/exams`, exam, {withCredentials: true});
  }

  getConsumerAvailableExamsHeader(): Observable<ExamHeader[]> {
    return this.http.get<ExamHeader[]>(`${environment.baseUrl}/api/exams/headers`, {withCredentials: true});
  }

  getConsumerAvailableExam(examUuid: string): Observable<Exam> {
    return this.http.get<Exam>(`${environment.baseUrl}/api/exams/active-exam/${examUuid}`, {withCredentials: true});
  }
}
