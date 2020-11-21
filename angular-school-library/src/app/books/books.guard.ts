import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BookFacade } from './state/book.facade';
import { AuthenticationFacade } from '../authentication/state/authentication.facade';
import { first, flatMap } from 'rxjs/operators';

@Injectable()
export class BooksGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationFacade: AuthenticationFacade,
    private bookFacade: BookFacade) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (next.params && next.params.id && (+next.params.id) === 0) {
        return this.authenticationFacade.getCanEditBook()
          .pipe(
            first(),
            flatMap((result: boolean) => {
              if (!result) {
                this.router.navigate(['/login']);
                return of (false);
              }

              this.bookFacade.setIsEditMode(true);
              return of (true);
            })
          );
      } else {
        this.bookFacade.setIsEditMode(false);
      }

      return true;
  }
}
