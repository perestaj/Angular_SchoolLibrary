import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';
import { first, flatMap } from 'rxjs/operators';
import { PublishersFacade } from './state/publishers.facade';

@Injectable()
export class PublisherGuard implements CanActivate {
  constructor(private _router: Router,
    private _authenticationFacade: AuthenticationFacade,
    private _publishersFacade: PublishersFacade) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this._authenticationFacade.getCanEditPublishers()
      .pipe(
          first(),
          flatMap((result: boolean) => {
            if (!result) {
              this._router.navigate(['/login']);
              return of(false);
            }

            const id = next.paramMap.get('id');
            if (isNaN(parseInt(id, 10))) {
              this._router.navigate(['/administration/publishers']);
              return of(false);
            }

            this._publishersFacade.setIsEditMode( +id === 0);

          return of(true);
          }));
  }
}
