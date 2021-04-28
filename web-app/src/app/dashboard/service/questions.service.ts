import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Question} from '../../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) {
  }

  getAllQuestionsByUser(): Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.baseUrl}/api/questions`, {withCredentials: true});
  }

  createQuestion(question: Question): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/questions`, question, {withCredentials: true});
  }
}
