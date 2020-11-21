import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IBook } from '../../models/book.model';
import { IAuthor } from '../../../shared/models/author.model';
import { IPublisher } from '../../../shared/models/publisher.model';

import { Observable } from 'rxjs';
import { BookFacade } from '../../state/book.facade';
import { AppFacade } from 'src/app/state/app.facade';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: 'book-details.component.html',
  styleUrls: ['book-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  public isEditMode$: Observable<boolean>;
  public canEditBook$: Observable<boolean>;
  public book$: Observable<IBook>;
  public authors$: Observable<IAuthor[]>;
  public publishers$: Observable<IPublisher[]>;

  constructor(
    private bookFacade: BookFacade,
    private appFacade: AppFacade,
    private authenticationFacade: AuthenticationFacade,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.appFacade.loadAuthors();
    this.appFacade.loadPublishers();
    this.bookFacade.loadBook();

    this.authors$ = this.appFacade.getAuthors();
    this.publishers$ = this.appFacade.getPublishers();
    this.book$ = this.bookFacade.getBook();

    this.isEditMode$ = this.bookFacade.getIsEditMode();
    this.canEditBook$ = this.authenticationFacade.getCanEditBook();
  }

  public ngOnDestroy(): void {
    this.bookFacade.clearBook();
  }

  public edit(): void {
    this.bookFacade.setIsEditMode(true);
  }

  public cancelEdit(): void {
    this.bookFacade.setIsEditMode(false);
  }

  public save(book: IBook): void {
    this.bookFacade.save(book);
  }

  public redirectToBooksList(): void {
    this.router.navigate(['/books']);
  }
}
