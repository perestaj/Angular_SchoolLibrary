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
import { pipe, of, empty, EMPTY } from 'rxjs';
import { ILoansState, getLoansSortCriteria, getLoansSearchFilter } from './loans.reducer';
import { Store, select } from '@ngrx/store';
import { ILoanEvent } from '../models/loan-event.model';

@Injectable()
export class LoansEffects {
    constructor(private _actions$: Actions,
        private _booksService: BooksService,
        private _loanService: LoansService,
        private _store: Store<ILoansState>) { }

    @Effect()
    loadDefaultSearchFilter$ = this._actions$.pipe(
        ofType(loansActions.ActionTypes.LoadDefaultSearchFilter),
        withLatestFrom(this._store.pipe(select(getLoansSearchFilter))),
        switchMap(([, filter]) => {
          if (!filter || !filter.bookStatuses || filter.bookStatuses.findIndex(x => x.id === 0) > -1) {
            return this._booksService.getBookStatuses().pipe(
              map((statuses: IBookStatus[]) => {
              const loanBookStatuses = statuses.filter(status => status.id !== BookStatuses.Available);

              const bookStatusSearchFilter = loanBookStatuses.map(status => <IBookStatusSearch>{
                  id: status.id,
                  name: status.name,
                  selected: true
              });

              const defaultFilter = <ILoanSearchFilter>{
                  title: '',
                  user: '',
                  bookStatuses: bookStatusSearchFilter
              };

              return new loansActions.FilterLoansAction(defaultFilter);
          }));
          } else {
            return EMPTY;
          }
        })
    );

    @Effect()
    loadLoans$ = this._actions$.pipe(
        ofType(loansActions.ActionTypes.LoadLoans),
        mergeMap(() => this._loanService.getLoans().pipe(
            map((loans: ILoan[]) => new loansActions.LoadLoansSuccessAction(loans)),
            catchError((err, caught) => {
              // error handled by http interceptor
              return EMPTY;
            }
        ))
    ));

    @Effect()
    sortLoans$ = this._actions$.pipe(
        ofType(loansActions.ActionTypes.SortLoans),
        pipe(
            map((action: loansActions.SortLoansAction) => action.payload),
            withLatestFrom(this._store.pipe(select(getLoansSortCriteria))),
            switchMap(([column, oldCriteria]) => {
                return of(new loansActions.SortLoansSuccessAction({
                    sortColumn: column,
                    sortOrderDesc: column === oldCriteria.sortColumn ? !oldCriteria.sortOrderDesc : false
                  }));
            })
        )
    );

    @Effect()
    lendBook$ = this._actions$.pipe(
      ofType(loansActions.ActionTypes.LendBook),
      pipe(
        map((action: loansActions.LendBookAction) => action.payload),
        switchMap((loanEvent: ILoanEvent) => {
          return this._loanService.lendBook(loanEvent.userID, loanEvent.bookID).pipe(
            map(() => {
              this._store.dispatch(new loansActions.LendBookShowInfoAction(true));
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
    returnBook$ = this._actions$.pipe(
      ofType(loansActions.ActionTypes.ReturnBook),
      pipe(
        map((action: loansActions.ReturnBookAction) => action.payload),
        switchMap((loanEvent: ILoanEvent) => {
          return this._loanService.returnBook(loanEvent.userID, loanEvent.bookID).pipe(
            map(() => {
              this._store.dispatch(new loansActions.ReturnBookShowInfoAction(true));
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
    setBookStatusToLost$ = this._actions$.pipe(
      ofType(loansActions.ActionTypes.SetBookStatusToLost),
      pipe(
        map((action: loansActions.SetBookStatusToLostAction) => action.payload),
        switchMap((loanEvent: ILoanEvent) => {
          return this._loanService.setBookStatusToLost(loanEvent.userID, loanEvent.bookID).pipe(
            map(() => {
              this._store.dispatch(new loansActions.SetBookStatusToLostShowInfoAction(true));
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
