import { Action } from '@ngrx/store';
import { IPublisherSearchFilter } from '../models/publishers-search-filter.model';
import { PublisherSortColumns } from '../models/publisher-sort-columns';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { IPublisher } from 'src/app/shared/models/publisher.model';

export enum ActionTypes {
  LoadPublisher = '[Publisher] Load Publisher',
  LoadPublisherSuccess = '[Publisher] Load Publisher Success',
  ClearPublisher = '[Publisher] Clear Publisher',
  FilterPublishers = '[Publisher] Filter Publishers',
  SortPublishers = '[Publisher] Sort Publishers',
  SortPublishersSuccess = '[Publisher] Sort Publishers Success',
  DeletePublisher = '[Publisher] Delete Publisher',
  DeletePublisherSuccessShowInfo = '[Publisher] Delete Publisher Success Show Info',
  SavePublisher = '[Publisher] Save Publisher',
  SetEditMode = '[Publisher] Set Edit Mode'
}

export class LoadPublisherAction implements Action {
  public readonly type = ActionTypes.LoadPublisher;

  constructor() { }
}

export class LoadPublisherSuccessAction implements Action {
  public readonly type = ActionTypes.LoadPublisherSuccess;

  constructor(public payload: IPublisher) { }
}

export class ClearPublisherAction implements Action {
  public readonly type = ActionTypes.ClearPublisher;

  constructor() { }
}

export class FilterPublishersAction implements Action {
  public readonly type = ActionTypes.FilterPublishers;

  constructor(public payload: IPublisherSearchFilter) { }
}

export class SortPublishersAction implements Action {
  public readonly type = ActionTypes.SortPublishers;

  constructor(public payload: PublisherSortColumns) { }
}

export class SortPublishersSuccessAction implements Action {
  public readonly type = ActionTypes.SortPublishersSuccess;

  constructor(public payload: ISortCriteria<PublisherSortColumns>) { }
}

export class DeletePublisherAction implements Action {
  public readonly type = ActionTypes.DeletePublisher;

  constructor(public payload: number) { }
}

export class DeletePublisherSuccessShowInfoAction implements Action {
  public readonly type = ActionTypes.DeletePublisherSuccessShowInfo;

  constructor(public payload: boolean) { }
}

export class SavePublisherAction implements Action {
  public readonly type = ActionTypes.SavePublisher;

  constructor(public payload: IPublisher) { }
}

export class SetEditModeAction implements Action {
  public readonly type = ActionTypes.SetEditMode;

  constructor(public payload: boolean) { }
}

export type Actions =
  | LoadPublisherAction
  | LoadPublisherSuccessAction
  | ClearPublisherAction
  | FilterPublishersAction
  | SortPublishersAction
  | SortPublishersSuccessAction
  | DeletePublisherAction
  | DeletePublisherSuccessShowInfoAction
  | SavePublisherAction
  | SetEditModeAction;
