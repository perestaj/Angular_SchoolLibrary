import { Action } from '@ngrx/store';
import { ICurrentUser } from 'src/app/administration/users/models/current-user.model';
import { ILogin } from '../login/login.model';

export enum ActionTypes {
    AuthorizeFromLocalStorage = '[Authentication] Authorize From Local Storage',
    Login = '[Authentication] Login',
    LoginSuccess = '[Authentication] Login Success',
    LogOff = '[Authentication] Log Off',
    LogOffSuccess = '[Authentication] Log Off Success',
    LoadUserFromLocalStorage = '[Authentication] Load User From Local Storage',
    SetCanAddBook = '[Authentication] Set Can Add Book',
    SetCanEditBook = '[Authentication] Set Can Edit Book',
    SetCanDeleteBook = '[Authentication] Set Can Delete Book',
    SetCanRequestBook = '[Authentication] Set Can Request Book',
    SetCanDisplayLoans = '[Authentication] Set Can Display Loans',
    SetCanEditLoans = '[Authentication] Set Can Edit Loans',
    SetDisplayAdministrationLink = '[Authentication] Set Display Administration Link',
    SetCanDisplayAuthors = '[Authentication] Set Can Display Authors',
    SetCanEditAuthors = '[Authentication] Set Can Edit Authors',
    SetCanDisplayPublishers = '[Authentication] Set Can Display Publishers',
    SetCanEditPublishers = '[Authentication] Set Can Edit Publishers',
    SetCanDisplayUsers = '[Authentication] Set Can Display Users',
    SetCanEditUsers = '[Authentication] Set Can Edit Users',
    SetInvalidUsernamePassword = '[Authentication] Set Invalid Username Password'
}

export class AuthorizeFromLocalStorageAction implements Action {
    public readonly type  = ActionTypes.AuthorizeFromLocalStorage;
    constructor() { }
}

export class LoginAction implements Action {
    public readonly type = ActionTypes.Login;

    constructor(public payload: ILogin) { }
}

export class LoginSuccessAction implements Action {
    public readonly type = ActionTypes.LoginSuccess;

    constructor(public payload: ICurrentUser) { }
}

export class LogOffAction implements Action {
    public readonly type = ActionTypes.LogOff;

    constructor() { }
}

export class LogOffSuccessAction implements Action {
    public readonly type = ActionTypes.LogOffSuccess;

    constructor() { }
}

export class LoadUserFromLocalStorageAction implements Action {
    public readonly type = ActionTypes.LoadUserFromLocalStorage;

    constructor() { }
}


export class SetCanAddBookAction implements Action {
    public readonly type = ActionTypes.SetCanAddBook;

    constructor(public payload: boolean) { }
}

export class SetCanEditBookAction implements Action {
    public readonly type = ActionTypes.SetCanEditBook;

    constructor(public payload: boolean) { }
}

export class SetCanDeleteBookAction implements Action {
    public readonly type = ActionTypes.SetCanDeleteBook;

    constructor(public payload: boolean) { }
}

export class SetCanRequestBookAction implements Action {
    public readonly type = ActionTypes.SetCanRequestBook;

    constructor(public payload: boolean) { }
}

export class SetCanDisplayLoansAction implements Action {
    public readonly type = ActionTypes.SetCanDisplayLoans;

    constructor(public payload: boolean) { }
}

export class SetCanEditLoansAction implements Action {
    public readonly type = ActionTypes.SetCanEditLoans;

    constructor(public payload: boolean) { }
}

export class SetDisplayAdministrationLinkAction implements Action {
    public readonly type = ActionTypes.SetDisplayAdministrationLink;

    constructor(public payload: boolean) { }
}

export class SetCanDisplayAuthorsAction implements Action {
    public readonly type = ActionTypes.SetCanDisplayAuthors;

    constructor(public payload: boolean) { }
}

export class SetCanEditAuthorsAction implements Action {
    public readonly type = ActionTypes.SetCanEditAuthors;

    constructor(public payload: boolean) { }
}

export class SetCanDisplayPublishersAction implements Action {
    public readonly type = ActionTypes.SetCanDisplayPublishers;

    constructor(public payload: boolean) { }
}

export class SetCanEditPublishersAction implements Action {
    public readonly type = ActionTypes.SetCanEditPublishers;

    constructor(public payload: boolean) { }
}

export class SetCanDisplayUsersAction implements Action {
    public readonly type = ActionTypes.SetCanDisplayUsers;

    constructor(public payload: boolean) { }
}

export class SetCanEditUsersAction implements Action {
    public readonly type = ActionTypes.SetCanEditUsers;

    constructor(public payload: boolean) { }
}

export class SetInvalidUsernamePassword implements Action {
    public readonly type = ActionTypes.SetInvalidUsernamePassword;
    constructor(public payload: boolean) { }
}

export type Actions =
    | AuthorizeFromLocalStorageAction
    | LoginAction
    | LoginSuccessAction
    | LogOffAction
    | LogOffSuccessAction
    | LoadUserFromLocalStorageAction
    | SetCanAddBookAction
    | SetCanEditBookAction
    | SetCanDeleteBookAction
    | SetCanRequestBookAction
    | SetCanDisplayLoansAction
    | SetCanEditLoansAction
    | SetDisplayAdministrationLinkAction
    | SetCanDisplayAuthorsAction
    | SetCanEditAuthorsAction
    | SetCanDisplayPublishersAction
    | SetCanEditPublishersAction
    | SetCanDisplayUsersAction
    | SetCanEditUsersAction
    | SetInvalidUsernamePassword;
