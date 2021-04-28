import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {selectAuthCurrentUser} from '../../store/app.selectors';
import {map, take} from 'rxjs/operators';
import {UserRole} from '../../models/enum/user-role.enum';

export const canActivateWithRole = (role: UserRole) => ({
  data: {role}, canActivate: [RoleAuthGuard]
});

@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {
  constructor(private store: Store<AppState>,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectAuthCurrentUser).pipe(
      take(1),
      map(currentUser => {
        if (currentUser?.role === route.data.role) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
