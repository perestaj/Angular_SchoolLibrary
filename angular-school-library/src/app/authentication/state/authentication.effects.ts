import { Injectable } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as authenticationActions from './authentication.actions';
import { mergeMap, map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { of, empty, EMPTY } from "rxjs";
import { ICurrentUser } from "src/app/administration/users/models/current-user.model";
import { Store } from "@ngrx/store";
import { IAuthenticationState } from "./authentication.reducer";
import { HttpErrorResponse } from "@angular/common/http";


@Injectable()
export class AuthenticationEffects {
    constructor(
        private _actions$: Actions,
        private _router: Router,
        private _store: Store<IAuthenticationState>,
        private _authenticationService: AuthenticationService) { }

    @Effect()
    login$ = this._actions$.pipe(
      ofType(authenticationActions.ActionTypes.Login),
      mergeMap((action: authenticationActions.LoginAction) =>
        this._authenticationService
          .login(action.payload)
          .pipe(
            map((currentUser: ICurrentUser) => {
                this.authorize(currentUser);
                this._router.navigate(['/home']);

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
    authorizeFromLocalStorage$ = this._actions$.pipe(
        ofType(authenticationActions.ActionTypes.AuthorizeFromLocalStorage),
        mergeMap(() => {
            const currentUser = this._authenticationService.authorizeFromLocalStorage();
            if (currentUser) {
                this.authorize(currentUser);
                return of(new authenticationActions.LoginSuccessAction(currentUser));
            } else {
                return EMPTY;
            }
        })
    );

    @Effect()
    logOff$ = this._actions$.pipe(
        ofType(authenticationActions.ActionTypes.LogOff),
        mergeMap(() => {
            this._authenticationService.logOff();
            return of (new authenticationActions.LogOffSuccessAction());
        })
    );

    private authorize(currentUser: ICurrentUser): void {
        this._store.dispatch(new authenticationActions.SetCanAddBookAction(this._authenticationService.canAddBook(currentUser)));
        this._store.dispatch(new authenticationActions.SetCanEditBookAction(this._authenticationService.canEditBook(currentUser)));
        this._store.dispatch(new authenticationActions.SetCanDeleteBookAction(
            this._authenticationService.canDeleteBook(currentUser)));
        this._store.dispatch(new authenticationActions.SetCanRequestBookAction(
            this._authenticationService.canRequestBook(currentUser)));
        this._store.dispatch(new authenticationActions.SetCanDisplayLoansAction(
            this._authenticationService.canDisplayLoans(currentUser)));
        this._store.dispatch(new authenticationActions.SetCanEditLoansAction(
            this._authenticationService.canEditLoans(currentUser)));
        this._store.dispatch(new authenticationActions.SetDisplayAdministrationLinkAction(
            this._authenticationService.displayAdministrationLink(currentUser)));
        this._store.dispatch(new authenticationActions.SetCanDisplayAuthorsAction(
            this._authenticationService.canDisplayAuthors(currentUser)));
        this._store.dispatch(new authenticationActions.SetCanEditAuthorsAction(
            this._authenticationService.canEditAuthors(currentUser)));
        this._store.dispatch(new authenticationActions.SetCanDisplayPublishersAction(
            this._authenticationService.canDisplayPublishers(currentUser)));
        this._store.dispatch(new authenticationActions.SetCanEditPublishersAction(
            this._authenticationService.canEditPublishers(currentUser)));
        this._store.dispatch(new authenticationActions.SetCanDisplayUsersAction(
            this._authenticationService.canDisplayUsers(currentUser)));
        this._store.dispatch(new authenticationActions.SetCanEditUsersAction(
            this._authenticationService.canEditUsers(currentUser)));
    }
}
