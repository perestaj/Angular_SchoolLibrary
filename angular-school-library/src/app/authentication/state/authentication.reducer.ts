import { ICurrentUser } from 'src/app/administration/users/models/current-user.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Actions, ActionTypes } from './authentication.actions';

export interface IAuthenticationState {
    currentUser: ICurrentUser;
    canAddBook: boolean;
    canEditBook: boolean;
    canDeleteBook: boolean;
    canRequestBook: boolean;
    canDisplayLoans: boolean;
    canEditLoans: boolean;
    displayAdministrationLink: boolean;
    canDisplayAuthors: boolean;
    canEditAuthors: boolean;
    canDisplayPublishers: boolean;
    canEditPublishers: boolean;
    canDisplayUsers: boolean;
    canEditUsers: boolean;
    invalidUsernamePassword: boolean;
}

const initialState: IAuthenticationState = {
    currentUser: null,
    canAddBook: false,
    canEditBook: false,
    canDeleteBook: false,
    canRequestBook: false,
    canDisplayLoans: false,
    canEditLoans: false,
    displayAdministrationLink: false,
    canDisplayAuthors: false,
    canEditAuthors: false,
    canDisplayPublishers: false,
    canEditPublishers: false,
    canDisplayUsers: false,
    canEditUsers: false,
    invalidUsernamePassword: false
};

const getAuthenticationState = createFeatureSelector<IAuthenticationState>('authentication');

export const getCurrentUser = createSelector(
    getAuthenticationState,
    state => state.currentUser
);

export const getCanAddBook = createSelector(
    getAuthenticationState,
    state => state.canAddBook
);

export const getCanEditBook = createSelector(
    getAuthenticationState,
    state => state.canEditBook
);

export const getCanDeleteBook = createSelector(
    getAuthenticationState,
    state => state.canDeleteBook
);

export const getCanRequestBook = createSelector(
    getAuthenticationState,
    state => state.canRequestBook
);

export const getCanDisplayLoans = createSelector(
    getAuthenticationState,
    state => state.canDisplayLoans
);

export const getCanEditLoans = createSelector(
    getAuthenticationState,
    state => state.canEditLoans
);

export const getDisplayAdministrationLink = createSelector(
    getAuthenticationState,
    state => state.displayAdministrationLink
);

export const getCanDisplayAuthors = createSelector(
    getAuthenticationState,
    state => state.canDisplayAuthors
);

export const getCanEditAuthors = createSelector(
    getAuthenticationState,
    state => state.canEditAuthors
);

export const getCanDisplayPublishers = createSelector(
    getAuthenticationState,
    state => state.canDisplayPublishers
);

export const getCanEditPublishers = createSelector(
    getAuthenticationState,
    state => state.canEditPublishers
);

export const getCanDisplayUsers = createSelector(
    getAuthenticationState,
    state => state.canDisplayUsers
);

export const getCanEditUsers = createSelector(
    getAuthenticationState,
    state => state.canEditUsers
);

export const getInvalidUsernamePassword = createSelector(
    getAuthenticationState,
    state => state.invalidUsernamePassword
);

export function reducer(state: IAuthenticationState = initialState, action: Actions): IAuthenticationState {
    switch (action.type) {
        case ActionTypes.LoginSuccess:
            return { ...state, currentUser: action.payload, invalidUsernamePassword: false };
        case ActionTypes.LogOffSuccess:
            return initialState;
        case ActionTypes.SetCanAddBook:
            return { ...state, canAddBook: action.payload};
        case ActionTypes.SetCanEditBook:
            return { ...state, canEditBook: action.payload};
        case ActionTypes.SetCanDeleteBook:
            return { ...state, canDeleteBook: action.payload};
        case ActionTypes.SetCanRequestBook:
            return { ...state, canRequestBook: action.payload};
        case ActionTypes.SetCanDisplayLoans:
            return { ...state, canDisplayLoans: action.payload};
        case ActionTypes.SetCanEditLoans:
            return { ...state, canEditLoans: action.payload};
        case ActionTypes.SetDisplayAdministrationLink:
            return { ...state, displayAdministrationLink: action.payload};
        case ActionTypes.SetCanDisplayAuthors:
            return { ...state, canDisplayAuthors: action.payload};
        case ActionTypes.SetCanEditAuthors:
            return { ...state, canEditAuthors: action.payload};
        case ActionTypes.SetCanDisplayPublishers:
            return { ...state, canDisplayPublishers: action.payload};
        case ActionTypes.SetCanEditPublishers:
            return { ...state, canEditPublishers: action.payload};
        case ActionTypes.SetCanDisplayUsers:
            return { ...state, canDisplayUsers: action.payload};
        case ActionTypes.SetCanEditUsers:
            return { ...state, canEditUsers: action.payload};
        case ActionTypes.SetInvalidUsernamePassword:
            return { ...state, invalidUsernamePassword: action.payload };
        default:
            return state;
    }
}
