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
  private _componentActive: boolean;

  public sortCriteria$: Observable<ISortCriteria<AuthorSortColumns>>;
  public authorsSearchFilter$: Observable<IAuthorSearchFilter>;
  public filteredAuthors$: Observable<IAuthor[]>;

  constructor(
    private _authorsFacade: AuthorsFacade,
    private _appFacade: AppFacade) { }

  public ngOnInit(): void {
    this._componentActive = true;

    this._appFacade.loadAuthors();

    this.authorsSearchFilter$ = this._authorsFacade.getAuthorsSearchFilter();
    this.sortCriteria$ = this._authorsFacade.getSortCriteria();
    this.filteredAuthors$ = this._authorsFacade.getFilteredAuthors();

    this._authorsFacade.getAuthorDeletedShowInfo().pipe(takeWhile(() => this._componentActive))
    .subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('Author has been deleted successfully');
        this._authorsFacade.deleteAuthorSuccessShowInfo(false);
        this._appFacade.loadAuthors();
      }
    });
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
  }

  public deleteAuthor(authorID: number): void {
    if (window.confirm('Are you sure you want to delete this author?')) {
      this._authorsFacade.deleteAuthor(authorID);
    }
  }

  public filterAuthors(authorsSearchFilter: IAuthorSearchFilter) {
    this._authorsFacade.filterAuthors(authorsSearchFilter);
  }

  public sortAuthors(column: AuthorSortColumns) {
    this._authorsFacade.sortAuthors(column);
  }
}
