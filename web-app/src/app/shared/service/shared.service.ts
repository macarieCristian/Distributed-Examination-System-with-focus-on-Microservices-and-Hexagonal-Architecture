import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) {
  }

  getRoot(): Observable<any> {
    return this.http.get(`${environment.baseUrl}`, {withCredentials: true});
  }
}


