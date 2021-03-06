import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationFacade } from '../authentication/state/authentication.facade';
import { first, mergeMap } from 'rxjs/operators';

@Injectable()
export class LoansGuard implements CanActivate {
  constructor(private router: Router, private authenticationFacade: AuthenticationFacade) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticationFacade.getCanDisplayLoans().pipe(
      first(),
      mergeMap((result: boolean) => {
        if (!result) {
          this.router.navigate(['/login']);
          return of(false);
        }

        return of(true);
      })
    );
  }
}
