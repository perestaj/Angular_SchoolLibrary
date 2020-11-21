import { Injectable } from '@angular/core';
import * as publisherActions from './publishers.actions';
import * as publisherSelectors from './publishers.reducer';
import { Store, select } from '@ngrx/store';
import { IPublisherSearchFilter } from '../models/publishers-search-filter.model';
import { Observable, combineLatest } from 'rxjs';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { PublisherSortColumns } from '../models/publisher-sort-columns';
import { IPublisher } from 'src/app/shared/models/publisher.model';
import { getPublishers } from 'src/app/state/app.reducer';
import { map } from 'rxjs/operators';

@Injectable()
export class PublishersFacade {
  constructor(private store: Store<publisherSelectors.IPublishersState>) {}

  public loadPublisher(): void {
    this.store.dispatch(new publisherActions.LoadPublisherAction());
  }

  public getPublisher(): Observable<IPublisher> {
      return this.store.pipe(select(publisherSelectors.getPublisher));
  }

  public clearPublisher(): void {
    this.store.dispatch(new publisherActions.ClearPublisherAction());
  }

  public getIsEditMode(): Observable<boolean> {
    return this.store.pipe(select(publisherSelectors.getIsEditMode));
  }

  public setIsEditMode(isEditMode: boolean): void {
      this.store.dispatch(new publisherActions.SetEditModeAction(isEditMode));
  }

  public getFilteredPublishers(): Observable<IPublisher[]> {
    return combineLatest(
      this.store.pipe(select(getPublishers)),
      this.store.pipe(select(publisherSelectors.getPublishersSearchFilter)),
      this.store.pipe(select(publisherSelectors.getPublishersSortCriteria))
    ).pipe(
        map(([publishers, searchFilter, sortCriteria]) => {
            const filteredPublishers = this.filter(publishers, searchFilter);
            this.sort(filteredPublishers, sortCriteria.sortColumn, sortCriteria.sortOrderDesc);

            return filteredPublishers;
          })
    );
  }

  public getSortCriteria(): Observable<ISortCriteria<PublisherSortColumns>> {
      return this.store.pipe(select(publisherSelectors.getPublishersSortCriteria));
  }

  public getPublishersSearchFilter(): Observable<IPublisherSearchFilter> {
    return this.store.pipe(select(publisherSelectors.getPublishersSearchFilter));
  }

  public filterPublishers(PublishersSearchFilter: IPublisherSearchFilter): void {
    this.store.dispatch(new publisherActions.FilterPublishersAction(PublishersSearchFilter));
  }

  public sortPublishers(column: PublisherSortColumns): void {
    this.store.dispatch(new publisherActions.SortPublishersAction(column));
  }

  public deletePublisher(PublisherID: number): void {
    this.store.dispatch(new publisherActions.DeletePublisherAction(PublisherID));
  }

  public getPublisherDeletedShowInfo(): Observable<boolean> {
    return this.store.pipe(select(publisherSelectors.getPublisherDeletedShowInfo));
  }

  public deletePublisherSuccessShowInfo(show: boolean): void {
    this.store.dispatch(new publisherActions.DeletePublisherSuccessShowInfoAction(show));
  }

  public save(Publisher: IPublisher): void {
    this.store.dispatch(new publisherActions.SavePublisherAction(Publisher));
  }

  private filter(publishers: IPublisher[], publishersSearchFilter: IPublisherSearchFilter): IPublisher[] {
    if (!publishers || !publishersSearchFilter) {
      return publishers;
    }

    return publishers.filter(publisher => {
      const nameQuery = !publishersSearchFilter.name || publishersSearchFilter.name.length === 0 ||
            publisher.name.toUpperCase().includes(publishersSearchFilter.name.toUpperCase());

      const addressQuery = !publishersSearchFilter.address || publishersSearchFilter.address.length === 0 ||
            publisher.address.toUpperCase().includes(publishersSearchFilter.address.toUpperCase());

      const additionalInformationQuery = !publishersSearchFilter.additionalInformation ||
            publishersSearchFilter.additionalInformation.length === 0 ||
            publisher.additionalInformation.toUpperCase().includes(publishersSearchFilter.additionalInformation.toUpperCase());

      return nameQuery && addressQuery && additionalInformationQuery;
    });
  }

  private sort(publishers: IPublisher[], column: string, publishersSortDesc: boolean): void {
    publishers.sort((first, second) => {
      let firstField: any;
      let secondField: any;

      if (column === PublisherSortColumns.Name) {
        firstField = first.name.toUpperCase();
        secondField = second.name.toUpperCase();
      } else if (column === PublisherSortColumns.Address) {
        firstField = first.address.toUpperCase();
        secondField = second.address.toUpperCase();
      } else if (column === PublisherSortColumns.AdditionalInformation) {
        firstField = first.additionalInformation.toUpperCase();
        secondField = second.additionalInformation.toUpperCase();
      } else {
        return 0;
      }

      let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
      if (publishersSortDesc) {
        comparison = -comparison;
      }

      return comparison;
    });
  }
}
