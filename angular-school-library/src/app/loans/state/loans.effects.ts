import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as loansActions from './loans.actions';
import { mergeMap, map, withLatestFrom, switchMap, catchError } from 'rxjs/operators';
import { ILoan } from '../models/loan.model';
import { LoansService } from '../loans.service';
import { BooksService } from 'src/app/books/books.service';
import { IBookStatus } from '../models/book-status.model';
import { ILoanSearchFilter, IBookStatusSearch } from '../models/loan-search-filter.model';
import { BookStatuses } from '../../shared/models/book-statuses';
import { pipe, of, EMPTY } from 'rxjs';
import { ILoansState, getLoansSortCriteria, getLoansSearchFilter } from './loans.reducer';
import { Store, select } from '@ngrx/store';
import { ILoanEvent } from '../models/loan-event.model';

@Injectable()
export class LoansEffects {
    constructor(
      private actions$: Actions,
      private booksService: BooksService,
      private loanService: LoansService,
      private store: Store<ILoansState>) { }

    @Effect()
    loadDefaultSearchFilter$ = this.actions$.pipe(
        ofType(loansActions.ActionTypes.LoadDefaultSearchFilter),
        withLatestFrom(this.store.pipe(select(getLoansSearchFilter))),
        switchMap(([, filter]) => {
          if (!filter || !filter.bookStatuses || filter.bookStatuses.findIndex(x => x.id === 0) > -1) {
            return this.booksService.getBookStatuses().pipe(
              map((statuses: IBookStatus[]) => {
              const loanBookStatuses = statuses.filter(status => status.id !== BookStatuses.Available);

              const bookStatusSearchFilter = loanBookStatuses.map(status => {
                return {
                  id: status.id,
                  name: status.name,
                  selected: true
                } as IBookStatusSearch;
              });

              const defaultFilter = {
                  title: '',
                  user: '',
                  bookStatuses: bookStatusSearchFilter
              } as ILoanSearchFilter;

              return new loansActions.FilterLoansAction(defaultFilter);
          }));
          } else {
            return EMPTY;
          }
        })
    );

    @Effect()
    loadLoans$ = this.actions$.pipe(
        ofType(loansActions.ActionTypes.LoadLoans),
        mergeMap(() => this.loanService.getLoans().pipe(
            map((loans: ILoan[]) => new loansActions.LoadLoansSuccessAction(loans)),
            catchError((err, caught) => {
              // error handled by http interceptor
              return EMPTY;
            }
        ))
    ));

    @Effect()
    sortLoans$ = this.actions$.pipe(
        ofType(loansActions.ActionTypes.SortLoans),
        pipe(
            map((action: loansActions.SortLoansAction) => action.payload),
            withLatestFrom(this.store.pipe(select(getLoansSortCriteria))),
            switchMap(([column, oldCriteria]) => {
                return of(new loansActions.SortLoansSuccessAction({
                    sortColumn: column,
                    sortOrderDesc: column === oldCriteria.sortColumn ? !oldCriteria.sortOrderDesc : false
                  }));
            })
        )
    );

    @Effect()
    lendBook$ = this.actions$.pipe(
      ofType(loansActions.ActionTypes.LendBook),
      pipe(
        map((action: loansActions.LendBookAction) => action.payload),
        switchMap((loanEvent: ILoanEvent) => {
          return this.loanService.lendBook(loanEvent.userID, loanEvent.bookID).pipe(
            map(() => {
              this.store.dispatch(new loansActions.LendBookShowInfoAction(true));
              return new loansActions.LoadLoansAction();
            }),
            catchError((err, caught) => {
              // error handled by http interceptor
              return EMPTY;
            })
          );
        })
      )
    );

    @Effect()
    returnBook$ = this.actions$.pipe(
      ofType(loansActions.ActionTypes.ReturnBook),
      pipe(
        map((action: loansActions.ReturnBookAction) => action.payload),
        switchMap((loanEvent: ILoanEvent) => {
          return this.loanService.returnBook(loanEvent.userID, loanEvent.bookID).pipe(
            map(() => {
              this.store.dispatch(new loansActions.ReturnBookShowInfoAction(true));
              return new loansActions.LoadLoansAction();
            }),
            catchError((err, caught) => {
              // error handled by http interceptor
              return EMPTY;
            })
      );
      })
    ));

    @Effect()
    setBookStatusToLost$ = this.actions$.pipe(
      ofType(loansActions.ActionTypes.SetBookStatusToLost),
      pipe(
        map((action: loansActions.SetBookStatusToLostAction) => action.payload),
        switchMap((loanEvent: ILoanEvent) => {
          return this.loanService.setBookStatusToLost(loanEvent.userID, loanEvent.bookID).pipe(
            map(() => {
              this.store.dispatch(new loansActions.SetBookStatusToLostShowInfoAction(true));
              return new loansActions.LoadLoansAction();
            }),
            catchError((err, caught) => {
              // error handled by http interceptor
              return EMPTY;
            })
          );
        }
      )
    ));
}
