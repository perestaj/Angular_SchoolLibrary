import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BookStatuses } from '../../../../shared/models/book-statuses';
import { ILoan } from '../../../models/loan.model';
import { ILoanEvent } from '../../../models/loan-event.model';

import { LoanSortColumns } from '../../../models/loan-sort-columns';

@Component({
  selector: 'app-loans-table',
  templateUrl: 'loans-table.component.html',
  styleUrls: ['loans-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoansTableComponent {
  @Input() loans: Array<ILoan>;
  @Input() sortColumn: string;

  @Output() sortLoansList = new EventEmitter<string>();
  @Output() lendBook = new EventEmitter<ILoanEvent>();
  @Output() returnBook = new EventEmitter<ILoanEvent>();
  @Output() setBookStatusToLost = new EventEmitter<ILoanEvent>();

  public loanColumns = LoanSortColumns;
  public bookStatus = BookStatuses;

  constructor() { }

  public setBookStatus(status, bookID, userID): void {
    const loanEvent =  { bookID, userID } as ILoanEvent;

    if (status === BookStatuses.Available) {
      this.returnBook.emit(loanEvent);
    } else if (status === BookStatuses.Borrowed) {
      this.lendBook.emit(loanEvent);
    } else if (status === BookStatuses.Lost) {
      this.setBookStatusToLost.emit(loanEvent);
    }
  }
}
