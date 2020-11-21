import { Injectable } from '@angular/core';
import { ILogin } from '../login/login.model';
import { Store, select } from '@ngrx/store';
import { IAuthenticationState, getInvalidUsernamePassword, getCurrentUser, getCanRequestBook, getCanDeleteBook, getCanAddBook, getCanEditBook, getCanDisplayLoans, getCanEditAuthors, getCanDisplayPublishers, getCanDisplayUsers, getCanEditPublishers, getCanEditUsers, getCanEditLoans, getDisplayAdministrationLink } from './authentication.reducer';
import * as authenticationActions from './authentication.actions';
import { Observable } from 'rxjs';
import { ICurrentUser } from 'src/app/administration/users/models/current-user.model';

@Injectable()
export class AuthenticationFacade {
    constructor(private store: Store<IAuthenticationState>) {}

    public authorizeFromLocalStorage(): void {
        this.store.dispatch(new authenticationActions.AuthorizeFromLocalStorageAction());
    }

    public login(loginData: ILogin): void {
        this.store.dispatch(new authenticationActions.LoginAction(loginData));
    }

    public logOff(): void {
        this.store.dispatch(new authenticationActions.LogOffAction());
    }

    public getInvalidUsernamePassword(): Observable<boolean> {
        return this.store.pipe(select(getInvalidUsernamePassword));
    }

    public getCurrentUser(): Observable<ICurrentUser> {
        return this.store.pipe(select(getCurrentUser));
    }

    public getCanRequestBook(): Observable<boolean> {
        return this.store.pipe(select(getCanRequestBook));
    }

    public getCanDeleteBook(): Observable<boolean> {
        return this.store.pipe(select(getCanDeleteBook));
    }

    public getCanAddBook(): Observable<boolean> {
        return this.store.pipe(select(getCanAddBook));
    }

    public getCanEditBook(): Observable<boolean> {
        return this.store.pipe(select(getCanEditBook));
    }

    public getCanDisplayLoans(): Observable<boolean> {
        return this.store.pipe(select(getCanDisplayLoans));
    }

    public getCanEditLoans(): Observable<boolean> {
        return this.store.pipe(select(getCanEditLoans));
    }

    public getCanEditAuthors(): Observable<boolean> {
        return this.store.pipe(select(getCanEditAuthors));
    }

    public getCanDisplayPublishers(): Observable<boolean> {
        return this.store.pipe(select(getCanDisplayPublishers));
    }

    public getCanDisplayUsers(): Observable<boolean> {
        return this.store.pipe(select(getCanDisplayUsers));
    }

    public getCanEditPublishers(): Observable<boolean> {
        return this.store.pipe(select(getCanEditPublishers));
    }

    public getCanEditUsers(): Observable<boolean> {
        return this.store.pipe(select(getCanEditUsers));
    }

    public getDisplayAdministrationLink(): Observable<boolean> {
        return this.store.pipe(select(getDisplayAdministrationLink));
    }
}
