import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ILoanSearchFilter } from '../../models/loan-search-filter.model';
import { ILoan } from '../../models/loan.model';
import { ILoanEvent } from '../../models/loan-event.model';

import { LoanSortColumns } from '../../models/loan-sort-columns';

import { ISortCriteria } from '../../../shared/models/sort-criteria.model';
import { LoansFacade } from '../../state/loans.facade';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-loans-list',
  templateUrl: 'loans-list.component.html',
  styleUrls: ['loans-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoansListComponent implements OnInit, OnDestroy {
  private _componentActive: boolean;

  public loansSearchFilter$: Observable<ILoanSearchFilter>;
  public filteredLoans$: Observable<ILoan[]>;
  public sortCriteria$: Observable<ISortCriteria<LoanSortColumns>>;

  constructor(private _loansFacade: LoansFacade) { }

  public ngOnInit(): void {
    this._componentActive = true;

    this._loansFacade.loadDefaultSearchFilter();
    this._loansFacade.loadLoans();

    this.sortCriteria$ = this._loansFacade.getLoansSortCriteria();
    this.loansSearchFilter$ = this._loansFacade.getLoansSearchFilter();

    this.filteredLoans$ = this._loansFacade.getLoans();

    this._loansFacade.getLendBookShowInfo().pipe(
      takeWhile(() => this._componentActive)
    ).subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('The status has been changed successfully');
        this._loansFacade.setLendBookShowInfo(false);
      }
    });

    this._loansFacade.getReturnBookShowInfo().pipe(
      takeWhile(() => this._componentActive)
    ).subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('The status has been changed successfully');
        this._loansFacade.setReturnBookShowInfo(false);
      }
    });

    this._loansFacade.getSetBookStatusToLostShowInfo().pipe(
      takeWhile(() => this._componentActive)
    ).subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('The status has been changed successfully');
        this._loansFacade.setBookStatusToLostShowInfo(false);
      }
    });
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
  }

  public filterLoansList(loansSearchFilter: ILoanSearchFilter): void {
    this._loansFacade.filterLoans(loansSearchFilter);
  }

  public sortLoans(column: LoanSortColumns): void {
    this._loansFacade.sortLoans(column);
  }

  public lendBook(loanEvent: ILoanEvent): void {
    if (window.confirm('Are you sure you want to change the status to \'Borrowed\'?')) {
      this._loansFacade.lendBook(loanEvent);
    }
  }

  public returnBook(loanEvent: ILoanEvent): void {
    if (window.confirm('Are you sure you want to change the status to \'Available\'?')) {
      this._loansFacade.returnBook(loanEvent);
    }
  }

  public setBookStatusToLost(loanEvent: ILoanEvent): void {
    if (window.confirm('Are you sure you want to change the status to \'Lost\'?')) {
      this._loansFacade.setBookStatusToLost(loanEvent);
    }
  }
}
