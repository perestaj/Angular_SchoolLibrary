import { IUserSearchFilter } from '../models/users-search-filter.model';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { UserSortColumns } from '../models/user-sort-columns';
import { Actions, ActionTypes } from './users.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IAdministrationState } from '../../state/administration.reducer';
import { IUser } from '../models/user.model';
import { IUserRole } from '../models/user-role.model';

export interface IUsersState {
  roles: IUserRole[];
  users: IUser[];
  usersSearchFilter: IUserSearchFilter;
  sortCriteria: ISortCriteria<UserSortColumns>;
  userDeletedShowInfo: boolean;
  user: IUser;
  isEditMode: boolean;
}

const initialState: IUsersState = {
    roles: [],
    users: [],
    usersSearchFilter: null,
    sortCriteria: {
      sortColumn: UserSortColumns.FullName,
      sortOrderDesc: false
    },
    userDeletedShowInfo: false,
    user: null,
    isEditMode: false
};

const getAdministrationState = createFeatureSelector<IAdministrationState>('administration');

const getUsersState = createSelector(
  getAdministrationState,
  state => state.users
);

export const getRoles = createSelector(
  getUsersState,
  state => state.roles
);

export const getUsers = createSelector(
  getUsersState,
  state => state.users
);

export const getUsersSearchFilter = createSelector(
  getUsersState,
  state => state.usersSearchFilter
);

export const getUser = createSelector(
  getUsersState,
  state => state.user
);

export const getUsersSortCriteria = createSelector(
  getUsersState,
  state => state.sortCriteria
);

export const getUserDeletedShowInfo = createSelector(
  getUsersState,
  state => state.userDeletedShowInfo
);

export const getIsEditMode = createSelector(
  getUsersState,
  state => state.isEditMode
);

export function reducer(state: IUsersState = initialState, action: Actions): IUsersState {
    switch (action.type) {
      case ActionTypes.LoadRolesSuccess:
        return { ...state, roles: action.payload };
      case ActionTypes.FilterUsers:
        return { ...state, usersSearchFilter: action.payload };
      case ActionTypes.LoadUserSuccess:
        return { ...state, user: action.payload};
      case ActionTypes.LoadUsersSuccess:
        return { ...state, users: action.payload };
      case ActionTypes.ClearUser:
        return { ...state, user: null };
      case ActionTypes.SortUsersSuccess:
        return { ...state, sortCriteria: action.payload };
      case ActionTypes.DeleteUserSuccessShowInfo:
        return { ...state, userDeletedShowInfo: action.payload };
      case ActionTypes.SetEditMode:
        return { ...state, isEditMode: action.payload };
      default:
        return state;
    }
}
