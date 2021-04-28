import {Injectable} from '@angular/core';
import {CanDeactivate, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

export interface ComponentWithPendingChanges {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard implements CanDeactivate<ComponentWithPendingChanges> {
  canDeactivate(component: ComponentWithPendingChanges): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate() ?
      true :
      confirm('WARNING: You are about to leave the exam. Press Cancel to go back and continue, or OK to lose your answers.');
  }


}
