import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAuthorSearchFilter } from '../../models/authors-search-filter.model';
import { IAuthor } from '../../../../shared/models/author.model';

import {AuthorSortColumns} from '../../models/author-sort-columns';
import { AuthorsFacade } from '../../state/authors.facade';
import { AppFacade } from 'src/app/state/app.facade';
import { Observable } from 'rxjs';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-authors-list',
  templateUrl: 'authors-list.component.html',
  styleUrls: ['authors-list.component.css']
})
export class AuthorsListComponent implements OnInit, OnDestroy {
  private componentActive: boolean;

  public sortCriteria$: Observable<ISortCriteria<AuthorSortColumns>>;
  public authorsSearchFilter$: Observable<IAuthorSearchFilter>;
  public filteredAuthors$: Observable<IAuthor[]>;

  constructor(
    private authorsFacade: AuthorsFacade,
    private appFacade: AppFacade) { }

  public ngOnInit(): void {
    this.componentActive = true;

    this.appFacade.loadAuthors();

    this.authorsSearchFilter$ = this.authorsFacade.getAuthorsSearchFilter();
    this.sortCriteria$ = this.authorsFacade.getSortCriteria();
    this.filteredAuthors$ = this.authorsFacade.getFilteredAuthors();

    this.authorsFacade.getAuthorDeletedShowInfo().pipe(takeWhile(() => this.componentActive))
    .subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('Author has been deleted successfully');
        this.authorsFacade.deleteAuthorSuccessShowInfo(false);
        this.appFacade.loadAuthors();
      }
    });
  }

  public ngOnDestroy(): void {
    this.componentActive = false;
  }

  public deleteAuthor(authorID: number): void {
    if (window.confirm('Are you sure you want to delete this author?')) {
      this.authorsFacade.deleteAuthor(authorID);
    }
  }

  public filterAuthors(authorsSearchFilter: IAuthorSearchFilter): void {
    this.authorsFacade.filterAuthors(authorsSearchFilter);
  }

  public sortAuthors(column: AuthorSortColumns): void {
    this.authorsFacade.sortAuthors(column);
  }
}
