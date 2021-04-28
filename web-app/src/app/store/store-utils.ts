import {Observable, of} from 'rxjs';

export class StoreUtils {
  static handleEffectError(errorRes: any, failAction: (errorMessage: string) => any): Observable<any> {
    const errorMessage = errorRes?.error?.message || 'An unknown error occurred!';
    return of(failAction(errorMessage));
  };
}
