import { Action } from '@ngrx/store';
import { ILoan } from '../models/loan.model';
import { ILoanSearchFilter } from '../models/loan-search-filter.model';
import { ISortCriteria } from '../../shared/models/sort-criteria.model';
import { LoanSortColumns } from '../models/loan-sort-columns';
import { ILoanEvent } from '../models/loan-event.model';

export enum ActionTypes {
    LoadDefaultSearchFilter = '[Loan] Load Default Search Filter',
    LoadLoans = '[Loan] Load Loans',
    LoadLoansSuccess = '[Loan] Load Loans Success',
    FilterLoans = '[Loan] Filter Loans',
    SortLoans = '[Loan] Sort Loans',
    SortLoansSuccess = '[Loan] Sort Loans Success',
    LendBook = '[Loan] Lend Book',
    ReturnBook = '[Loan] Return Book',
    SetBookStatusToLost = '[Loan] Set Book Status To Lost',

    LendBookShowInfo = '[Loan] Lend Book Show Info',
    ReturnBookShowInfo = '[Loan] Return Book Show Info',
    SetBookStatusToLostShowInfo = '[Loan] Set Book Status To Lost Show Info'
}

export class LoadDefaultSearchFilterAction implements Action {
    public readonly type = ActionTypes.LoadDefaultSearchFilter;

    constructor() { }
}

export class LoadLoansAction implements Action {
    public readonly type = ActionTypes.LoadLoans;

    constructor() { }
}

export class LoadLoansSuccessAction implements Action {
    public readonly type = ActionTypes.LoadLoansSuccess;

    constructor(public payload: ILoan[]) { }
}

export class FilterLoansAction implements Action {
    public readonly type = ActionTypes.FilterLoans;

    constructor(public payload: ILoanSearchFilter) { }
}

export class SortLoansAction implements Action {
    public readonly type = ActionTypes.SortLoans;

    constructor(public payload: LoanSortColumns) { }
}

export class SortLoansSuccessAction implements Action {
    public readonly type = ActionTypes.SortLoansSuccess;

    constructor(public payload: ISortCriteria<LoanSortColumns>) { }
}

export class LendBookAction implements Action {
    public readonly type = ActionTypes.LendBook;

    constructor(public payload: ILoanEvent) { }
}

export class ReturnBookAction implements Action {
    public readonly type = ActionTypes.ReturnBook;

    constructor(public payload: ILoanEvent) { }
}

export class SetBookStatusToLostAction implements Action {
    public readonly type = ActionTypes.SetBookStatusToLost;

    constructor(public payload: ILoanEvent) { }
}

export class LendBookShowInfoAction implements Action {
  public readonly type = ActionTypes.LendBookShowInfo;

  constructor(public payload: boolean) { }
}

export class ReturnBookShowInfoAction implements Action {
  public readonly type = ActionTypes.ReturnBookShowInfo;

  constructor(public payload: boolean) { }
}

export class SetBookStatusToLostShowInfoAction implements Action {
  public readonly type = ActionTypes.SetBookStatusToLostShowInfo;

  constructor(public payload: boolean) { }
}

export type Actions =
    | LoadLoansAction
    | LoadLoansSuccessAction
    | FilterLoansAction
    | SortLoansAction
    | SortLoansSuccessAction
    | LendBookAction
    | ReturnBookAction
    | SetBookStatusToLostAction
    | LendBookShowInfoAction
    | ReturnBookShowInfoAction
    | SetBookStatusToLostShowInfoAction;
