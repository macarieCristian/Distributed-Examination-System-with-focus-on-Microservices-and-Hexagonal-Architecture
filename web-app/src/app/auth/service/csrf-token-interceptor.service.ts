import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class CsrfTokenInterceptorService implements HttpInterceptor {
  constructor(private cookieService: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = this.cookieService.get('CSRF-TOKEN');
    if (csrfToken && req.method !== 'GET' && req.method !== 'OPTIONS') {
      const modifiedReq = req.clone({headers: new HttpHeaders().set('CSRF-Token', csrfToken)});
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }

}
