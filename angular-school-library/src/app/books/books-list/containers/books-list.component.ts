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
  private componentActive: boolean;

  public publishers$: Observable<IPublisher[]>;
  public authors$: Observable<IAuthor[]>;
  public booksSearchFilter$: Observable<IBookSearchFilter>;
  public filteredBooks$: Observable<IBook[]>;

  public sortCriteria$: Observable<ISortCriteria<BookSortColumns>>;

  public showRequestBook$: Observable<boolean>;
  public showDeleteButton$: Observable<boolean>;
  public showAddButton$: Observable<boolean>;

  constructor(
    private appFacade: AppFacade,
    private bookFacade: BookFacade,
    private authenticationFacade: AuthenticationFacade,
    ) {
    this.showRequestBook$ = this.authenticationFacade.getCanRequestBook();
    this.showDeleteButton$ = this.authenticationFacade.getCanDeleteBook();
    this.showAddButton$ = this.authenticationFacade.getCanAddBook();
  }

  public ngOnInit(): void {
    this.componentActive = true;

    this.appFacade.loadPublishers();
    this.appFacade.loadAuthors();

    this.bookFacade.loadBooks();

    this.booksSearchFilter$ = this.bookFacade.getBooksSearchFilter();
    this.filteredBooks$ = this.bookFacade.getBooks();

    this.publishers$ = this.appFacade.getPublishers();
    this.authors$ = this.appFacade.getAuthors();

    this.sortCriteria$ = this.bookFacade.getSortCriteria();

    this.bookFacade.getBookRequestedShowInfo().pipe(
      takeWhile(() => this.componentActive)
    )
    .subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('Book request has been sent successfully');
        this.bookFacade.requestBookSuccessShowInfo(false);
        this.bookFacade.loadBooks();
      }
    });

    this.bookFacade.getBookDeletedShowInfo().pipe(takeWhile(() => this.componentActive))
    .subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('Book has been deleted successfully');
        this.bookFacade.deleteBookSuccessShowInfo(false);
        this.bookFacade.loadBooks();
      }
    });
  }

  public ngOnDestroy(): void {
    this.componentActive = false;
  }

  public filterBooks(booksSearchFilter: IBookSearchFilter): void {
    this.bookFacade.filterBooks(booksSearchFilter);
  }

  public sortBooks(column: BookSortColumns): void {
    this.bookFacade.sortBooks(column);
  }

  public requestBook(bookID: number): void {
    if (window.confirm('Are you sure you want to borrow this book?')) {
      this.bookFacade.requestBook(bookID);
    }
  }

  public deleteBook(bookID: number): void {
    if (window.confirm('Are you sure you want to delete this book?')) {
      this.bookFacade.deleteBook(bookID);
    }
  }
}
