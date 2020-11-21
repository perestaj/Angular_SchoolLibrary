import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';
import { first, flatMap } from 'rxjs/operators';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private _router: Router, private _authenticationFacade: AuthenticationFacade) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this._authenticationFacade.getCanDisplayUsers()
      .pipe(
        first(),
        flatMap((result: boolean) => {
          if (!result) {
            this._router.navigate(['/login']);
            return of(false);
          }

          return of(true);
        }));
  }
}
