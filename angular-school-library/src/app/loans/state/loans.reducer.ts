import { ILoan } from '../models/loan.model';
import { ILoanSearchFilter } from '../models/loan-search-filter.model';
import { ISortCriteria } from '../../shared/models/sort-criteria.model';
import { LoanSortColumns } from '../models/loan-sort-columns';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Actions, ActionTypes } from './loans.actions';

export interface ILoansState {
    loans: ILoan[];
    loansSearchFilter: ILoanSearchFilter;
    sortCriteria: ISortCriteria<LoanSortColumns>;

    lendBookShowInfo: boolean;
    returnBookShowInfo: boolean;
    setBookStatusToLostShowInfo: boolean;
}

export const initialState: ILoansState = {
    loans: [],
    loansSearchFilter: null,
    sortCriteria: {
        sortColumn: LoanSortColumns.Title,
        sortOrderDesc: false
    },

    lendBookShowInfo: false,
    returnBookShowInfo: false,
    setBookStatusToLostShowInfo: false
};

const getLoansState = createFeatureSelector<ILoansState>('loans');

export const getLoansSearchFilter = createSelector(
    getLoansState,
    state => state.loansSearchFilter
);

export const getLoans = createSelector(
    getLoansState,
    state => state.loans
);

export const getLoansSortCriteria = createSelector(
    getLoansState,
    state => state.sortCriteria
);

export const getLendBookShowInfo = createSelector(
  getLoansState,
    state => state.lendBookShowInfo
);

export const getReturnBookShowInfo = createSelector(
  getLoansState,
    state => state.returnBookShowInfo
);

export const getSetBookStatusToLostShowInfo = createSelector(
  getLoansState,
    state => state.setBookStatusToLostShowInfo
);


export function reducer(state: ILoansState = initialState, action: Actions): ILoansState {
    switch (action.type) {
        case ActionTypes.FilterLoans:
            return { ...state, loansSearchFilter: action.payload };
        case ActionTypes.LoadLoansSuccess:
            return Object.assign({}, state, {
                loans: action.payload
            });
        case ActionTypes.SortLoansSuccess:
            return { ...state, sortCriteria: action.payload };
        case ActionTypes.LendBookShowInfo:
            return { ...state, lendBookShowInfo: action.payload};
        case ActionTypes.ReturnBookShowInfo:
          return { ...state, returnBookShowInfo: action.payload};
        case ActionTypes.SetBookStatusToLostShowInfo:
            return { ...state, setBookStatusToLostShowInfo: action.payload };
        default:
            return state;
    }
}
