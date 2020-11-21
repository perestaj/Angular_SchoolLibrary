import { Action } from '@ngrx/store';
import { IAuthorSearchFilter } from '../models/authors-search-filter.model';
import { AuthorSortColumns } from '../models/author-sort-columns';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { IAuthor } from 'src/app/shared/models/author.model';

export enum ActionTypes {
  LoadAuthor = '[Author] Load Author',
  LoadAuthorSuccess = '[Author] Load Author Success',
  ClearAuthor = '[Author] Clear Author',
  FilterAuthors = '[Author] Filter Authors',
  SortAuthors = '[Author] Sort Authors',
  SortAuthorsSuccess = '[Author] Sort Authors Success',
  DeleteAuthor = '[Author] Delete Author',
  DeleteAuthorSuccessShowInfo = '[Author] Delete Author Success Show Info',
  SaveAuthor = '[Author] Save Author',
  SetEditMode = '[Author] Set Edit Mode'
}

export class LoadAuthorAction implements Action {
  public readonly type = ActionTypes.LoadAuthor;

  constructor() { }
}

export class LoadAuthorSuccessAction implements Action {
  public readonly type = ActionTypes.LoadAuthorSuccess;

  constructor(public payload: IAuthor) { }
}

export class ClearAuthorAction implements Action {
  public readonly type = ActionTypes.ClearAuthor;

  constructor() { }
}

export class FilterAuthorsAction implements Action {
  public readonly type = ActionTypes.FilterAuthors;

  constructor(public payload: IAuthorSearchFilter) { }
}

export class SortAuthorsAction implements Action {
  public readonly type = ActionTypes.SortAuthors;

  constructor(public payload: AuthorSortColumns) { }
}

export class SortAuthorsSuccessAction implements Action {
  public readonly type = ActionTypes.SortAuthorsSuccess;

  constructor(public payload: ISortCriteria<AuthorSortColumns>) { }
}

export class DeleteAuthorAction implements Action {
  public readonly type = ActionTypes.DeleteAuthor;

  constructor(public payload: number) { }
}

export class DeleteAuthorSuccessShowInfoAction implements Action {
  public readonly type = ActionTypes.DeleteAuthorSuccessShowInfo;

  constructor(public payload: boolean) { }
}

export class SaveAuthorAction implements Action {
  public readonly type = ActionTypes.SaveAuthor;

  constructor(public payload: IAuthor) { }
}

export class SetEditModeAction implements Action {
  public readonly type = ActionTypes.SetEditMode;

  constructor(public payload: boolean) { }
}

export type Actions =
  | LoadAuthorAction
  | LoadAuthorSuccessAction
  | ClearAuthorAction
  | FilterAuthorsAction
  | SortAuthorsAction
  | SortAuthorsSuccessAction
  | DeleteAuthorAction
  | DeleteAuthorSuccessShowInfoAction
  | SaveAuthorAction
  | SetEditModeAction;
