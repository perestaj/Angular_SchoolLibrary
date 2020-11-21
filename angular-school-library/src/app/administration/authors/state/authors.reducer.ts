import { IAuthorSearchFilter } from '../models/authors-search-filter.model';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { AuthorSortColumns } from '../models/author-sort-columns';
import { IAuthor } from 'src/app/shared/models/author.model';
import { Actions, ActionTypes } from './authors.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IAdministrationState } from '../../state/administration.reducer';

export interface IAuthorsState {
  authorsSearchFilter: IAuthorSearchFilter;
  sortCriteria: ISortCriteria<AuthorSortColumns>;
  authorDeletedShowInfo: boolean;
  author: IAuthor;
  isEditMode: boolean;
}

const initialState: IAuthorsState = {
    authorsSearchFilter: {
      additionalInformation: '',
      fullName: ''
    },
    sortCriteria: {
      sortColumn: AuthorSortColumns.FullName,
      sortOrderDesc: false
    },
    authorDeletedShowInfo: false,
    author: null,
    isEditMode: false
};

const getAdministrationState = createFeatureSelector<IAdministrationState>('administration');

const getAuthorsState = createSelector(
  getAdministrationState,
  state => state.authors
);

export const getAuthorsSearchFilter = createSelector(
  getAuthorsState,
  state => state.authorsSearchFilter
);

export const getAuthor = createSelector(
  getAuthorsState,
  state => state.author
);

export const getAuthorsSortCriteria = createSelector(
  getAuthorsState,
  state => state.sortCriteria
);

export const getAuthorDeletedShowInfo = createSelector(
  getAuthorsState,
  state => state.authorDeletedShowInfo
);

export const getIsEditMode = createSelector(
  getAuthorsState,
  state => state.isEditMode
);

export function reducer(state: IAuthorsState = initialState, action: Actions): IAuthorsState {
    switch (action.type) {
      case ActionTypes.FilterAuthors:
        return { ...state, authorsSearchFilter: action.payload };
      case ActionTypes.LoadAuthorSuccess:
        return { ...state, author: action.payload};
      case ActionTypes.ClearAuthor:
        return { ...state, author: null };
      case ActionTypes.SortAuthorsSuccess:
        return { ...state, sortCriteria: action.payload };
      case ActionTypes.DeleteAuthorSuccessShowInfo:
        return { ...state, authorDeletedShowInfo: action.payload };
      case ActionTypes.SetEditMode:
        return { ...state, isEditMode: action.payload };
      default:
        return state;
    }
}
