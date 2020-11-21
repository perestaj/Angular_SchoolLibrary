import { Injectable } from '@angular/core';
import * as authorActions from './authors.actions';
import * as authorSelectors from './authors.reducer';
import { Store, select } from '@ngrx/store';
import { IAuthorSearchFilter } from '../models/authors-search-filter.model';
import { Observable, combineLatest } from 'rxjs';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { AuthorSortColumns } from '../models/author-sort-columns';
import { IAuthor } from 'src/app/shared/models/author.model';
import { getAuthors } from 'src/app/state/app.reducer';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthorsFacade {
  constructor(private store: Store<authorSelectors.IAuthorsState>) {}

  public loadAuthor(): void {
    this.store.dispatch(new authorActions.LoadAuthorAction());
  }

  public getAuthor(): Observable<IAuthor> {
      return this.store.pipe(select(authorSelectors.getAuthor));
  }

  public clearAuthor(): void {
    this.store.dispatch(new authorActions.ClearAuthorAction());
  }

  public getIsEditMode(): Observable<boolean> {
    return this.store.pipe(select(authorSelectors.getIsEditMode));
  }

  public setIsEditMode(isEditMode: boolean): void {
      this.store.dispatch(new authorActions.SetEditModeAction(isEditMode));
  }

  public getFilteredAuthors(): Observable<IAuthor[]> {
    return combineLatest(
      this.store.pipe(select(getAuthors)),
      this.store.pipe(select(authorSelectors.getAuthorsSearchFilter)),
      this.store.pipe(select(authorSelectors.getAuthorsSortCriteria))
    ).pipe(
        map(([authors, searchFilter, sortCriteria]) => {
            const filteredAuthors = this.filter(authors, searchFilter);
            this.sort(filteredAuthors, sortCriteria.sortColumn, sortCriteria.sortOrderDesc);

            return filteredAuthors;
          })
    );
  }

  public getSortCriteria(): Observable<ISortCriteria<AuthorSortColumns>> {
      return this.store.pipe(select(authorSelectors.getAuthorsSortCriteria));
  }

  public getAuthorsSearchFilter(): Observable<IAuthorSearchFilter> {
    return this.store.pipe(select(authorSelectors.getAuthorsSearchFilter));
  }

  public filterAuthors(authorsSearchFilter: IAuthorSearchFilter): void {
    this.store.dispatch(new authorActions.FilterAuthorsAction(authorsSearchFilter));
  }

  public sortAuthors(column: AuthorSortColumns): void {
    this.store.dispatch(new authorActions.SortAuthorsAction(column));
  }

  public deleteAuthor(authorID: number): void {
    this.store.dispatch(new authorActions.DeleteAuthorAction(authorID));
  }

  public getAuthorDeletedShowInfo(): Observable<boolean> {
    return this.store.pipe(select(authorSelectors.getAuthorDeletedShowInfo));
  }

  public deleteAuthorSuccessShowInfo(show: boolean): void {
    this.store.dispatch(new authorActions.DeleteAuthorSuccessShowInfoAction(show));
  }

  public save(author: IAuthor): void {
    this.store.dispatch(new authorActions.SaveAuthorAction(author));
  }

  private filter(authors: IAuthor[], authorsSearchFilter: IAuthorSearchFilter): IAuthor[] {
    if (!authors || !authorsSearchFilter) {
      return authors;
    }

    return authors.filter(author => {
      const fullNameQuery = !authorsSearchFilter.fullName || authorsSearchFilter.fullName.length === 0 ||
            author.fullName.toUpperCase().includes(authorsSearchFilter.fullName.toUpperCase());

      const additionalInformationQuery = !authorsSearchFilter.additionalInformation ||
            authorsSearchFilter.additionalInformation.length === 0 ||
            author.additionalInformation.toUpperCase().includes(authorsSearchFilter.additionalInformation.toUpperCase());

      return fullNameQuery && additionalInformationQuery;
    });
  }

  private sort(authors: IAuthor[], column: string, authorsSortDesc: boolean): void {
    authors.sort((first, second) => {
      let firstField: any;
      let secondField: any;

      if (column === AuthorSortColumns.FullName) {
        firstField = first.fullName.toUpperCase();
        secondField = second.fullName.toUpperCase();
      } else if (column === AuthorSortColumns.AdditionalInformation) {
        firstField = first.additionalInformation.toUpperCase();
        secondField = second.additionalInformation.toUpperCase();
      } else {
        return 0;
      }

      let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
      if (authorsSortDesc) {
        comparison = -comparison;
      }

      return comparison;
    });
  }
}
