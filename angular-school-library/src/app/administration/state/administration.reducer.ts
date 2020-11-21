import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthors from '../authors/state/authors.reducer';
import * as fromPublishers from '../publishers/state/publishers.reducer';
import * as fromUsers from '../users/state/users.reducer';

export interface IAdministrationState {
  authors: fromAuthors.IAuthorsState;
  publishers: fromPublishers.IPublishersState;
  users: fromUsers.IUsersState;
}

export const reducers: ActionReducerMap<IAdministrationState> = {
  authors: fromAuthors.reducer,
  publishers: fromPublishers.reducer,
  users: fromUsers.reducer
};
