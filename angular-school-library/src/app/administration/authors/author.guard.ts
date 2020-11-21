import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';
import { first, flatMap } from 'rxjs/operators';
import { AuthorsFacade } from './state/authors.facade';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authenticationFacade: AuthenticationFacade,
    private _authorsFacade: AuthorsFacade) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._authenticationFacade.getCanEditAuthors()
            .pipe(
                first(),
                flatMap((result: boolean) => {
                    if (!result) {
                        this._router.navigate(['/login']);
                        return of(false);
                    }

                    const id = next.paramMap.get('id');
                    if (isNaN(parseInt(id, 10))) {
                        this._router.navigate(['/administration/authors']);
                        return of(false);
                    }

                    this._authorsFacade.setIsEditMode( +id === 0);

                    return of(true);
                })
            );
  }
}
