import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { IPublisher } from '../../../shared/models/publisher.model';
import { IAuthor } from '../../../shared/models/author.model';
import { IBook } from '../../models/book.model';
import { IBookSearchFilter } from '../../models/books-search-filter.model';

import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { BookSortColumns } from '../../models/book-sort-columns';
import { ISortCriteria } from '../../../shared/models/sort-criteria.model';
import { BookFacade } from '../../state/book.facade';
import { AppFacade } from 'src/app/state/app.facade';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-books-list',
  templateUrl: 'books-list.component.html',
  styleUrls: ['books-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksListComponent implements OnInit, OnDestroy {
  private _componentActive: boolean;

  public publishers$: Observable<IPublisher[]>;
  public authors$: Observable<IAuthor[]>;
  public booksSearchFilter$: Observable<IBookSearchFilter>;
  public filteredBooks$: Observable<IBook[]>;

  public sortCriteria$: Observable<ISortCriteria<BookSortColumns>>;

  public showRequestBook$: Observable<boolean>;
  public showDeleteButton$: Observable<boolean>;
  public showAddButton$: Observable<boolean>;

  constructor(
    private _appFacade: AppFacade,
    private _bookFacade: BookFacade,
    private _authenticationFacade: AuthenticationFacade,
    ) {
    this.showRequestBook$ = this._authenticationFacade.getCanRequestBook();
    this.showDeleteButton$ = this._authenticationFacade.getCanDeleteBook();
    this.showAddButton$ = this._authenticationFacade.getCanAddBook();
  }

  public ngOnInit(): void {
    this._componentActive = true;

    this._appFacade.loadPublishers();
    this._appFacade.loadAuthors();

    this._bookFacade.loadBooks();

    this.booksSearchFilter$ = this._bookFacade.getBooksSearchFilter();
    this.filteredBooks$ = this._bookFacade.getBooks();

    this.publishers$ = this._appFacade.getPublishers();
    this.authors$ = this._appFacade.getAuthors();

    this.sortCriteria$ = this._bookFacade.getSortCriteria();

    this._bookFacade.getBookRequestedShowInfo().pipe(
      takeWhile(() => this._componentActive)
    )
    .subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('Book request has been sent successfully');
        this._bookFacade.requestBookSuccessShowInfo(false);
        this._bookFacade.loadBooks();
      }
    });

    this._bookFacade.getBookDeletedShowInfo().pipe(takeWhile(() => this._componentActive))
    .subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('Book has been deleted successfully');
        this._bookFacade.deleteBookSuccessShowInfo(false);
        this._bookFacade.loadBooks();
      }
    });
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
  }

  public filterBooks(booksSearchFilter: IBookSearchFilter): void {
    this._bookFacade.filterBooks(booksSearchFilter);
  }

  public sortBooks(column: BookSortColumns): void {
    this._bookFacade.sortBooks(column);
  }

  public requestBook(bookID: number): void {
    if (window.confirm('Are you sure you want to borrow this book?')) {
      this._bookFacade.requestBook(bookID);
    }
  }

  public deleteBook(bookID: number): void {
    if (window.confirm('Are you sure you want to delete this book?')) {
      this._bookFacade.deleteBook(bookID);
    }
  }
}
