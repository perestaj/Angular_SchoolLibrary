import { Injectable } from '@angular/core';
import { BooksService } from '../books.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, tap, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import * as bookActions from './book.actions';
import { IBook } from '../models/book.model';
import { LoansService } from '../../loans/loans.service';
import { Router } from '@angular/router';
import { of, Observable, pipe, EMPTY } from 'rxjs';
import { getRouterParams } from 'src/app/state/app.reducer';
import { Action, Store, select } from '@ngrx/store';
import { getBooksSortCriteria } from './book.reducer';

@Injectable()
export class BookEffects {
  constructor(
    private actions$: Actions,
    private bookService: BooksService,
    private loanService: LoansService,
    private router: Router,
    private store: Store<any>
  ) {}

  @Effect()
  loadBooks$ = this.actions$.pipe(
    ofType(bookActions.ActionTypes.LoadBooks),
    mergeMap(() => this.bookService
        .getBooks()
        .pipe(
          map((books: IBook[]) => new bookActions.LoadBooksSuccessAction(books)),
          catchError((err, caught) => {
            // error handled by http interceptor
            return EMPTY;
          })
        )
    )
  );

  @Effect()
  sortBooks$ = this.actions$.pipe(
      ofType(bookActions.ActionTypes.SortBooks),
      pipe(
          map((action: bookActions.SortBooksAction) => action.payload),
          withLatestFrom(this.store.pipe(select(getBooksSortCriteria))),
          switchMap(([column, oldCriteria]) => {
              return of(new bookActions.SortBooksSuccessAction({
                  sortColumn: column,
                  sortOrderDesc: oldCriteria && column === oldCriteria.sortColumn ? !oldCriteria.sortOrderDesc : false
                }));
          })
      )
  );

  @Effect()
  public loadBook$: Observable<Action> = this.actions$.pipe(
    ofType(bookActions.ActionTypes.LoadBook),
    pipe(
      withLatestFrom(this.store.pipe(select(getRouterParams))),
      switchMap(([, params]) => {
        let id = 0;

        if (params && params['id']) {
          id = +params['id'];
        }

        return id > 0
          ? this.bookService
              .getBook(id)
              .pipe(
                map(
                  (book: IBook) => new bookActions.LoadBookSuccessAction(book)
                ),
                catchError((err, caught) => {
                  // error handled by http interceptor
                  return EMPTY;
                })
              )
          : of(
              new bookActions.LoadBookSuccessAction({
                additionalInformation: '',
                authorIds: [],
                authorsList: '',
                bookID: 0,
                isDeleted: false,
                publisherID: 0,
                publisherName: '',
                status: 0,
                statusName: '',
                title: ''
              })
            );
      })
    )
  );

  @Effect()
  requestBook$ = this.actions$.pipe(
    ofType(bookActions.ActionTypes.RequestBook),
    mergeMap((action: bookActions.RequestBookAction) =>
      this.loanService
        .requestBook(action.payload)
        .pipe(
          map(() => new bookActions.RequestBookSuccessShowInfoAction(true)),
          catchError((err, caught) => {
            // error handled by http interceptor
            return EMPTY;
          })
        )
    )
  );

  @Effect()
  deleteBook$ = this.actions$.pipe(
    ofType(bookActions.ActionTypes.DeleteBook),
    mergeMap((action: bookActions.DeleteBookAction) =>
      this.bookService
        .deleteBook(action.payload)
        .pipe(
          map(() => new bookActions.DeleteBookSuccessShowInfoAction(true)),
          catchError((err, caught) => {
            // error handled by http interceptor
            return EMPTY;
          })
        )
    )
  );

  @Effect({ dispatch: false })
  saveBook$ = this.actions$.pipe(
    ofType(bookActions.ActionTypes.SaveBook),
    mergeMap((action: bookActions.SaveBookAction) =>
      this.bookService
        .updateBook(action.payload)
        .pipe(
          tap(() => this.router.navigate(['/books'])),
          catchError((err, caught) => {
            // error handled by http interceptor
            return EMPTY;
          })
        )
    )
  );
}
