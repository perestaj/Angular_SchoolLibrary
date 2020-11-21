import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';
import { first, flatMap } from 'rxjs/operators';
import { UsersFacade } from './state/users.facade';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationFacade: AuthenticationFacade,
    private usersFacade: UsersFacade) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticationFacade.getCanDisplayUsers()
    .pipe(
      first(),
      flatMap((result: boolean) => {
        if (!result) {
          this.router.navigate(['/login']);
          return of(false);
        }

        const id = next.paramMap.get('id');

        if (isNaN(parseInt(id, 10))) {
          this.router.navigate(['/administration/users']);
          return of(false);
        }

        this.usersFacade.setIsEditMode( +id === 0);

        return of(true);
      }));
  }
}
