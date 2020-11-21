import { Action } from '@ngrx/store';
import { IUserSearchFilter } from '../models/users-search-filter.model';
import { UserSortColumns } from '../models/user-sort-columns';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { IUser } from '../models/user.model';
import { IUserRole } from '../models/user-role.model';

export enum ActionTypes {
  LoadRoles = '[User] Load Roles',
  LoadRolesSuccess = '[User] Load Roles Success',
  LoadDefaultSearchFilter = '[User] Load Default Search Filter',
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load Users Success',
  LoadUser = '[User] Load User',
  LoadUserSuccess = '[User] Load User Success',
  ClearUser = '[User] Clear User',
  FilterUsers = '[User] Filter Users',
  SortUsers = '[User] Sort Users',
  SortUsersSuccess = '[User] Sort Users Success',
  DeleteUser = '[User] Delete User',
  DeleteUserSuccessShowInfo = '[User] Delete User Success Show Info',
  SaveUser = '[User] Save User',
  SetEditMode = '[User] Set Edit Mode'
}

export class LoadRolesAction implements Action {
  public readonly type = ActionTypes.LoadRoles;

  constructor() { }
}

export class LoadRolesSuccessAction implements Action {
  public readonly type = ActionTypes.LoadRolesSuccess;

  constructor(public payload: IUserRole[]) { }
}

export class LoadDefaultSearchFilterAction implements Action {
  public readonly type = ActionTypes.LoadDefaultSearchFilter;

  constructor() { }
}

export class LoadUsersAction implements Action {
  public readonly type = ActionTypes.LoadUsers;

  constructor() { }
}

export class LoadUsersSuccessAction implements Action {
  public readonly type = ActionTypes.LoadUsersSuccess;

  constructor(public payload: IUser[]) { }
}

export class LoadUserAction implements Action {
  public readonly type = ActionTypes.LoadUser;

  constructor() { }
}

export class LoadUserSuccessAction implements Action {
  public readonly type = ActionTypes.LoadUserSuccess;

  constructor(public payload: IUser) { }
}

export class ClearUserAction implements Action {
  public readonly type = ActionTypes.ClearUser;

  constructor() { }
}

export class FilterUsersAction implements Action {
  public readonly type = ActionTypes.FilterUsers;

  constructor(public payload: IUserSearchFilter) { }
}

export class SortUsersAction implements Action {
  public readonly type = ActionTypes.SortUsers;

  constructor(public payload: UserSortColumns) { }
}

export class SortUsersSuccessAction implements Action {
  public readonly type = ActionTypes.SortUsersSuccess;

  constructor(public payload: ISortCriteria<UserSortColumns>) { }
}

export class DeleteUserAction implements Action {
  public readonly type = ActionTypes.DeleteUser;

  constructor(public payload: number) { }
}

export class DeleteUserSuccessShowInfoAction implements Action {
  public readonly type = ActionTypes.DeleteUserSuccessShowInfo;

  constructor(public payload: boolean) { }
}

export class SaveUserAction implements Action {
  public readonly type = ActionTypes.SaveUser;

  constructor(public payload: IUser) { }
}

export class SetEditModeAction implements Action {
  public readonly type = ActionTypes.SetEditMode;

  constructor(public payload: boolean) { }
}

export type Actions =
  | LoadRolesAction
  | LoadRolesSuccessAction
  | LoadDefaultSearchFilterAction
  | LoadUsersAction
  | LoadUsersSuccessAction
  | LoadUserAction
  | LoadUserSuccessAction
  | ClearUserAction
  | FilterUsersAction
  | SortUsersAction
  | SortUsersSuccessAction
  | DeleteUserAction
  | DeleteUserSuccessShowInfoAction
  | SaveUserAction
  | SetEditModeAction;
