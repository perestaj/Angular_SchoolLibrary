import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { IBook } from '../models/book.model';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IBookSearchFilter } from '../models/books-search-filter.model';
import { BookSortColumns } from '../models/book-sort-columns';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import * as bookActions from './book.actions';
import * as bookSelectors from './book.reducer';

@Injectable()
export class BookFacade {
  constructor(private _store: Store<bookSelectors.IBookState>) {}

  public getBooks(): Observable<IBook[]> {
    return combineLatest(
      this._store.pipe(select(bookSelectors.getBooks)),
      this._store.pipe(select(bookSelectors.getBooksSearchFilter)),
      this._store.pipe(select(bookSelectors.getBooksSortCriteria))
    ).pipe(
        map(([books, searchFilter, sortCriteria]) => {
            const filteredBooks = this.filter(books, searchFilter);
            this.sort(filteredBooks, sortCriteria.sortColumn, sortCriteria.sortOrderDesc);

            return filteredBooks;
          })
    );
  }

  public getSortCriteria(): Observable<ISortCriteria<BookSortColumns>> {
      return this._store.pipe(select(bookSelectors.getBooksSortCriteria));
  }

  public getBooksSearchFilter(): Observable<IBookSearchFilter> {
    return this._store.pipe(select(bookSelectors.getBooksSearchFilter));
  }

  public filterBooks(booksSearchFilter: IBookSearchFilter): void {
    this._store.dispatch(new bookActions.FilterBooksAction(booksSearchFilter));
  }

  public sortBooks(column: BookSortColumns): void {
    this._store.dispatch(new bookActions.SortBooksAction(column));
  }

  public requestBook(bookID: number): void {
    this._store.dispatch(new bookActions.RequestBookAction(bookID));
  }

  public deleteBook(bookID: number): void {
    this._store.dispatch(new bookActions.DeleteBookAction(bookID));
  }

  public getBookRequestedShowInfo(): Observable<boolean> {
    return this._store.pipe(select(bookSelectors.getBookRequestedShowInfo));
  }

  public loadBooks(): void {
    this._store.dispatch(new bookActions.LoadBooksAction());
  }

  public requestBookSuccessShowInfo(show: boolean): void {
    this._store.dispatch(new bookActions.RequestBookSuccessShowInfoAction(show));
  }

  public getBookDeletedShowInfo(): Observable<boolean> {
    return this._store.pipe(select(bookSelectors.getBookDeletedShowInfo));
  }

  public deleteBookSuccessShowInfo(show: boolean): void {
    this._store.dispatch(new bookActions.DeleteBookSuccessShowInfoAction(show));
  }

  public loadBook(): void {
    this._store.dispatch(new bookActions.LoadBookAction());
  }

  public getBook(): Observable<IBook> {
      return this._store.pipe(select(bookSelectors.getBook));
  }

  public clearBook(): void {
    this._store.dispatch(new bookActions.ClearBookAction);
  }

  public save(book: IBook): void {
    this._store.dispatch(new bookActions.SaveBookAction(book));
  }

  public getIsEditMode(): Observable<boolean> {
      return this._store.pipe(select(bookSelectors.getIsEditMode));
  }

  public setIsEditMode(isEditMode: boolean): void {
      this._store.dispatch(new bookActions.SetEditModeAction(isEditMode));
  }

  private filter(
    books: IBook[],
    booksSearchFilter: IBookSearchFilter
  ): IBook[] {
    if (!books || !booksSearchFilter) {
      return books;
    }

    return books.filter(book => {
      const statusQuery = !booksSearchFilter.onlyAvailable || book.status === 1;

      const titleQuery =
        !booksSearchFilter.title ||
        booksSearchFilter.title.length === 0 ||
        book.title
          .toUpperCase()
          .includes(booksSearchFilter.title.toUpperCase());

      const publisherQuery =
        !booksSearchFilter.publisherID ||
        +booksSearchFilter.publisherID === 0 ||
        book.publisherID === +booksSearchFilter.publisherID;

      const authorQuery =
        !booksSearchFilter.authorID ||
        +booksSearchFilter.authorID === 0 ||
        book.authorIds.filter(author => author === +booksSearchFilter.authorID)
          .length > 0;

      return statusQuery && titleQuery && publisherQuery && authorQuery;
    });
  }

  private sort(books: IBook[], column: string, booksSortDesc: boolean) {
    books.sort((first, second) => {
      let firstField: any;
      let secondField: any;

      if (column === BookSortColumns.Title) {
        firstField = first.title.toUpperCase();
        secondField = second.title.toUpperCase();
      } else if (column === BookSortColumns.Authors) {
        firstField = first.authorsList.toUpperCase();
        secondField = second.authorsList.toUpperCase();
      } else if (column === BookSortColumns.Publisher) {
        firstField = first.publisherName.toUpperCase();
        secondField = second.publisherName.toUpperCase();
      } else if (column === BookSortColumns.Status) {
        firstField = first.statusName.toUpperCase();
        secondField = second.statusName.toUpperCase();
      } else {
        return 0;
      }

      let comparison =
        firstField > secondField ? 1 : firstField < secondField ? -1 : 0;
      if (booksSortDesc) {
        comparison = -comparison;
      }

      return comparison;
    });
  }
}
