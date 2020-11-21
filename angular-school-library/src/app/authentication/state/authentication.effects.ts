import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authenticationActions from './authentication.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { ICurrentUser } from 'src/app/administration/users/models/current-user.model';
import { Store } from '@ngrx/store';
import { IAuthenticationState } from './authentication.reducer';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class AuthenticationEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private store: Store<IAuthenticationState>,
        private authenticationService: AuthenticationService) { }

    @Effect()
    login$ = this.actions$.pipe(
      ofType(authenticationActions.ActionTypes.Login),
      mergeMap((action: authenticationActions.LoginAction) =>
        this.authenticationService
          .login(action.payload)
          .pipe(
            map((currentUser: ICurrentUser) => {
                this.authorize(currentUser);
                this.router.navigate(['/home']);

                return new authenticationActions.LoginSuccessAction(currentUser);
            }),
            catchError((error: HttpErrorResponse) => {
                if (error && error.status === 400) {
                    return of(new authenticationActions.SetInvalidUsernamePassword(true));
                }

                return EMPTY;
            })
      )
    ));

    @Effect()
    authorizeFromLocalStorage$ = this.actions$.pipe(
        ofType(authenticationActions.ActionTypes.AuthorizeFromLocalStorage),
        mergeMap(() => {
            const currentUser = this.authenticationService.authorizeFromLocalStorage();
            if (currentUser) {
                this.authorize(currentUser);
                return of(new authenticationActions.LoginSuccessAction(currentUser));
            } else {
                return EMPTY;
            }
        })
    );

    @Effect()
    logOff$ = this.actions$.pipe(
        ofType(authenticationActions.ActionTypes.LogOff),
        mergeMap(() => {
            this.authenticationService.logOff();
            return of (new authenticationActions.LogOffSuccessAction());
        })
    );

    private authorize(currentUser: ICurrentUser): void {
        this.store.dispatch(new authenticationActions.SetCanAddBookAction(this.authenticationService.canAddBook(currentUser)));
        this.store.dispatch(new authenticationActions.SetCanEditBookAction(this.authenticationService.canEditBook(currentUser)));
        this.store.dispatch(new authenticationActions.SetCanDeleteBookAction(
            this.authenticationService.canDeleteBook(currentUser)));
        this.store.dispatch(new authenticationActions.SetCanRequestBookAction(
            this.authenticationService.canRequestBook(currentUser)));
        this.store.dispatch(new authenticationActions.SetCanDisplayLoansAction(
            this.authenticationService.canDisplayLoans(currentUser)));
        this.store.dispatch(new authenticationActions.SetCanEditLoansAction(
            this.authenticationService.canEditLoans(currentUser)));
        this.store.dispatch(new authenticationActions.SetDisplayAdministrationLinkAction(
            this.authenticationService.displayAdministrationLink(currentUser)));
        this.store.dispatch(new authenticationActions.SetCanDisplayAuthorsAction(
            this.authenticationService.canDisplayAuthors(currentUser)));
        this.store.dispatch(new authenticationActions.SetCanEditAuthorsAction(
            this.authenticationService.canEditAuthors(currentUser)));
        this.store.dispatch(new authenticationActions.SetCanDisplayPublishersAction(
            this.authenticationService.canDisplayPublishers(currentUser)));
        this.store.dispatch(new authenticationActions.SetCanEditPublishersAction(
            this.authenticationService.canEditPublishers(currentUser)));
        this.store.dispatch(new authenticationActions.SetCanDisplayUsersAction(
            this.authenticationService.canDisplayUsers(currentUser)));
        this.store.dispatch(new authenticationActions.SetCanEditUsersAction(
            this.authenticationService.canEditUsers(currentUser)));
    }
}
