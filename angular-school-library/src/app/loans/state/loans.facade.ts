import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as loanSelectors from './loans.reducer';
import * as loanActions from './loans.actions';
import { Observable, combineLatest } from 'rxjs';
import { ILoanSearchFilter } from '../models/loan-search-filter.model';
import { LoanSortColumns } from '../models/loan-sort-columns';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { ILoan } from '../models/loan.model';
import { map } from 'rxjs/operators';
import { ILoanEvent } from '../models/loan-event.model';


@Injectable()
export class LoansFacade {
    constructor(private store: Store<loanSelectors.ILoansState>) {}

    public loadDefaultSearchFilter(): void {
        this.store.dispatch(new loanActions.LoadDefaultSearchFilterAction());
    }

    public filterLoans(loansSearchFilter: ILoanSearchFilter): void {
        this.store.dispatch(new loanActions.FilterLoansAction(loansSearchFilter));
    }

    public sortLoans(column: LoanSortColumns): void {
        this.store.dispatch(new loanActions.SortLoansAction(column));
    }

    public loadLoans(): void {
        this.store.dispatch(new loanActions.LoadLoansAction());
    }

    public getLoansSortCriteria(): Observable<ISortCriteria<LoanSortColumns>> {
        return this.store.pipe(select(loanSelectors.getLoansSortCriteria));
    }

    public getLoansSearchFilter(): Observable<ILoanSearchFilter> {
        return this.store.pipe(select(loanSelectors.getLoansSearchFilter));
    }

    public getLoans(): Observable<ILoan[]> {
        return combineLatest(
            this.store.pipe(select(loanSelectors.getLoans)),
            this.store.pipe(select(loanSelectors.getLoansSearchFilter)),
            this.store.pipe(select(loanSelectors.getLoansSortCriteria))
        ).pipe(
            map(([loans, searchFilter, sortCriteria]) => {
                const filteredLoans = this.filter(loans, searchFilter);
                this.sort(filteredLoans, sortCriteria.sortColumn, sortCriteria.sortOrderDesc);

                return filteredLoans;
                })
        );
    }

    public getLendBookShowInfo(): Observable<boolean> {
      return this.store.pipe(select(loanSelectors.getLendBookShowInfo));
    }

    public getReturnBookShowInfo(): Observable<boolean> {
      return this.store.pipe(select(loanSelectors.getReturnBookShowInfo));
    }

    public getSetBookStatusToLostShowInfo(): Observable<boolean> {
      return this.store.pipe(select(loanSelectors.getSetBookStatusToLostShowInfo));
    }

    public setLendBookShowInfo(showInfo: boolean): void {
      this.store.dispatch(new loanActions.LendBookShowInfoAction(showInfo));
    }

    public setReturnBookShowInfo(showInfo: boolean): void {
      this.store.dispatch(new loanActions.ReturnBookShowInfoAction(showInfo));
    }

    public setBookStatusToLostShowInfo(showInfo: boolean): void {
      this.store.dispatch(new loanActions.SetBookStatusToLostShowInfoAction(showInfo));
    }

    public lendBook(loanEvent: ILoanEvent): void {
      this.store.dispatch(new loanActions.LendBookAction(loanEvent));
    }

    public returnBook(loanEvent: ILoanEvent): void {
      this.store.dispatch(new loanActions.ReturnBookAction(loanEvent));
    }

    public setBookStatusToLost(loanEvent: ILoanEvent): void {
      this.store.dispatch(new loanActions.SetBookStatusToLostAction(loanEvent));
    }

    private filter(loans: ILoan[], loansSearchFilter: ILoanSearchFilter): ILoan[] {
        return loans.filter((loan) => {
          const titleQuery = loansSearchFilter.title.length === 0 ||
            loan.book.title.toUpperCase().includes(loansSearchFilter.title.toUpperCase());
          const userQuery = loansSearchFilter.user.length === 0 ||
            loan.user.fullName.toUpperCase().includes(loansSearchFilter.user.toUpperCase());
          const statusQuery = loansSearchFilter.bookStatuses
            .filter(status => status.selected)
            .map(status => status.id)
            .includes(loan.book.status);

          return titleQuery && userQuery && statusQuery;
        });
      }

      private sort(loans: ILoan[], column: string, loansSortDesc: boolean): void {
        loans.sort((first, second) => {
          let firstField: any;
          let secondField: any;

          if (column === LoanSortColumns.Title) {
            firstField = first.book.title.toUpperCase();
            secondField = second.book.title.toUpperCase();
          } else if (column === LoanSortColumns.Authors) {
            firstField = first.book.authorsList.toUpperCase();
            secondField = second.book.authorsList.toUpperCase();
          } else if (column === LoanSortColumns.User) {
            firstField = first.user.fullName.toUpperCase();
            secondField = second.user.fullName.toUpperCase();
          } else if (column === LoanSortColumns.RequestDate) {
            firstField = first.requestDate;
            secondField = second.requestDate;
          } else if (column === LoanSortColumns.BorrowDate) {
            firstField = first.borrowDate;
            secondField = second.borrowDate;
          } else if (column === LoanSortColumns.Status) {
            firstField = first.book.statusName.toUpperCase();
            secondField = second.book.statusName.toUpperCase();
          } else {
            return 0;
          }

          let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
          if (loansSortDesc) {
            comparison = -comparison;
          }

          return comparison;
        });
      }
}
