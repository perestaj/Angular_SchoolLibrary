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
  private componentActive: boolean;

  public loansSearchFilter$: Observable<ILoanSearchFilter>;
  public filteredLoans$: Observable<ILoan[]>;
  public sortCriteria$: Observable<ISortCriteria<LoanSortColumns>>;

  constructor(private loansFacade: LoansFacade) { }

  public ngOnInit(): void {
    this.componentActive = true;

    this.loansFacade.loadDefaultSearchFilter();
    this.loansFacade.loadLoans();

    this.sortCriteria$ = this.loansFacade.getLoansSortCriteria();
    this.loansSearchFilter$ = this.loansFacade.getLoansSearchFilter();

    this.filteredLoans$ = this.loansFacade.getLoans();

    this.loansFacade.getLendBookShowInfo().pipe(
      takeWhile(() => this.componentActive)
    ).subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('The status has been changed successfully');
        this.loansFacade.setLendBookShowInfo(false);
      }
    });

    this.loansFacade.getReturnBookShowInfo().pipe(
      takeWhile(() => this.componentActive)
    ).subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('The status has been changed successfully');
        this.loansFacade.setReturnBookShowInfo(false);
      }
    });

    this.loansFacade.getSetBookStatusToLostShowInfo().pipe(
      takeWhile(() => this.componentActive)
    ).subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('The status has been changed successfully');
        this.loansFacade.setBookStatusToLostShowInfo(false);
      }
    });
  }

  public ngOnDestroy(): void {
    this.componentActive = false;
  }

  public filterLoansList(loansSearchFilter: ILoanSearchFilter): void {
    this.loansFacade.filterLoans(loansSearchFilter);
  }

  public sortLoans(column: LoanSortColumns): void {
    this.loansFacade.sortLoans(column);
  }

  public lendBook(loanEvent: ILoanEvent): void {
    if (window.confirm('Are you sure you want to change the status to \'Borrowed\'?')) {
      this.loansFacade.lendBook(loanEvent);
    }
  }

  public returnBook(loanEvent: ILoanEvent): void {
    if (window.confirm('Are you sure you want to change the status to \'Available\'?')) {
      this.loansFacade.returnBook(loanEvent);
    }
  }

  public setBookStatusToLost(loanEvent: ILoanEvent): void {
    if (window.confirm('Are you sure you want to change the status to \'Lost\'?')) {
      this.loansFacade.setBookStatusToLost(loanEvent);
    }
  }
}
