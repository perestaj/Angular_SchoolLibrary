import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';
import { first, mergeMap } from 'rxjs/operators';
import { PublishersFacade } from './state/publishers.facade';

@Injectable()
export class PublisherGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationFacade: AuthenticationFacade,
    private publishersFacade: PublishersFacade) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authenticationFacade.getCanEditPublishers()
      .pipe(
          first(),
          mergeMap((result: boolean) => {
            if (!result) {
              this.router.navigate(['/login']);
              return of(false);
            }

            const id = next.paramMap.get('id');
            if (isNaN(parseInt(id, 10))) {
              this.router.navigate(['/administration/publishers']);
              return of(false);
            }

            this.publishersFacade.setIsEditMode( +id === 0);
            return of(true);
          }));
  }
}
