import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';
import { first, mergeMap } from 'rxjs/operators';
import { AuthorsFacade } from './state/authors.facade';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationFacade: AuthenticationFacade,
    private authorsFacade: AuthorsFacade) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authenticationFacade.getCanEditAuthors()
            .pipe(
                first(),
                mergeMap((result: boolean) => {
                    if (!result) {
                        this.router.navigate(['/login']);
                        return of(false);
                    }

                    const id = next.paramMap.get('id');
                    if (isNaN(parseInt(id, 10))) {
                        this.router.navigate(['/administration/authors']);
                        return of(false);
                    }

                    this.authorsFacade.setIsEditMode( +id === 0);

                    return of(true);
                })
            );
  }
}
