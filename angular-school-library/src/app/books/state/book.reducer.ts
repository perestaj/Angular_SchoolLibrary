import { IBookStatus } from '../../loans/models/book-status.model';
import { IBookSearchFilter } from '../models/books-search-filter.model';
import { IBook } from '../models/book.model';
import { Actions, ActionTypes } from './book.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISortCriteria } from '../../shared/models/sort-criteria.model';
import { BookSortColumns } from '../models/book-sort-columns';

export interface IBookState {
    bookStatuses: IBookStatus[];
    booksSearchFilter: IBookSearchFilter;
    books: IBook[];
    sortCriteria: ISortCriteria<BookSortColumns>;

    bookRequstedShowInfo: boolean;
    bookDeletedShowInfo: boolean;

    book: IBook;
    isEditMode: boolean;
}

const initialState: IBookState = {
    bookStatuses: [],
    booksSearchFilter: {
        authorID: 0,
        onlyAvailable: false,
        publisherID: 0,
        title: ''
    },
    books: [],
    sortCriteria: {
        sortColumn: BookSortColumns.Title,
        sortOrderDesc: false
    },

    bookRequstedShowInfo: false,
    bookDeletedShowInfo: false,

    book: null,
    isEditMode: false
};

const getBooksState = createFeatureSelector<IBookState>('books');

export const getBooksSearchFilter = createSelector(
    getBooksState,
    state => state.booksSearchFilter
);

export const getBooks = createSelector(
    getBooksState,
    state => state.books
);

export const getBook = createSelector(
    getBooksState,
    state => state.book
);

export const getBooksSortCriteria = createSelector(
    getBooksState,
    state => state.sortCriteria
);

export const getBookRequestedShowInfo = createSelector(
    getBooksState,
    state => state.bookRequstedShowInfo
);

export const getBookDeletedShowInfo = createSelector(
    getBooksState,
    state => state.bookDeletedShowInfo
);

export const getIsEditMode = createSelector(
    getBooksState,
    state => state.isEditMode
);

export function reducer(state: IBookState = initialState, action: Actions): IBookState {
    switch (action.type) {
        case ActionTypes.FilterBooks:
            return { ...state, booksSearchFilter: action.payload };
        case ActionTypes.LoadBooksSuccess:
            return Object.assign({}, state, {
                books: action.payload
            });
        case ActionTypes.LoadBookSuccess:
            return { ...state, book: action.payload};
        case ActionTypes.ClearBook:
            return { ...state, book: null };
        case ActionTypes.SortBooksSuccess:
            return { ...state, sortCriteria: action.payload };
        case ActionTypes.RequestBookSuccessShowInfo:
            return { ...state, bookRequstedShowInfo: action.payload };
        case ActionTypes.DeleteBookSuccessShowInfo:
            return { ...state, bookDeletedShowInfo: action.payload };
        case ActionTypes.SetEditMode:
            return { ...state, isEditMode: action.payload };
        default:
            return state;
    }
}
