import { IPublisherSearchFilter } from '../models/publishers-search-filter.model';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { PublisherSortColumns } from '../models/publisher-sort-columns';
import { IPublisher } from 'src/app/shared/models/publisher.model';
import { Actions, ActionTypes } from './publishers.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IAdministrationState } from '../../state/administration.reducer';

export interface IPublishersState {
  publishersSearchFilter: IPublisherSearchFilter;
  sortCriteria: ISortCriteria<PublisherSortColumns>;
  publisherDeletedShowInfo: boolean;
  publisher: IPublisher;
  isEditMode: boolean;
}

const initialState: IPublishersState = {
    publishersSearchFilter: {
     additionalInformation: '',
     address: '',
     name: ''
    },
    sortCriteria: {
      sortColumn: PublisherSortColumns.Name,
      sortOrderDesc: false
    },
    publisherDeletedShowInfo: false,
    publisher: null,
    isEditMode: false
};

const getAdministrationState = createFeatureSelector<IAdministrationState>('administration');

const getPublishersState = createSelector(
  getAdministrationState,
  state => state.publishers
);

export const getPublishersSearchFilter = createSelector(
  getPublishersState,
  state => state.publishersSearchFilter
);

export const getPublisher = createSelector(
  getPublishersState,
  state => state.publisher
);

export const getPublishersSortCriteria = createSelector(
  getPublishersState,
  state => state.sortCriteria
);

export const getPublisherDeletedShowInfo = createSelector(
  getPublishersState,
  state => state.publisherDeletedShowInfo
);

export const getIsEditMode = createSelector(
  getPublishersState,
  state => state.isEditMode
);

export function reducer(state: IPublishersState = initialState, action: Actions): IPublishersState {
    switch (action.type) {
      case ActionTypes.FilterPublishers:
        return { ...state, publishersSearchFilter: action.payload };
      case ActionTypes.LoadPublisherSuccess:
        return { ...state, publisher: action.payload};
      case ActionTypes.ClearPublisher:
        return { ...state, publisher: null };
      case ActionTypes.SortPublishersSuccess:
        return { ...state, sortCriteria: action.payload };
      case ActionTypes.DeletePublisherSuccessShowInfo:
        return { ...state, publisherDeletedShowInfo: action.payload };
      case ActionTypes.SetEditMode:
        return { ...state, isEditMode: action.payload };
      default:
        return state;
    }
}
