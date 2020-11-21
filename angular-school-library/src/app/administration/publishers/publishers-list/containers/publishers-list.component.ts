import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IPublisherSearchFilter } from '../../models/publishers-search-filter.model';
import { IPublisher } from '../../../../shared/models/publisher.model';

import { PublisherSortColumns } from '../../models/publisher-sort-columns';
import { Observable } from 'rxjs';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { PublishersFacade } from '../../state/publishers.facade';
import { AppFacade } from 'src/app/state/app.facade';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-publishers-list',
  templateUrl: 'publishers-list.component.html',
  styleUrls: ['publishers-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublishersListComponent implements OnInit, OnDestroy {
  private _componentActive: boolean;

  public sortCriteria$: Observable<ISortCriteria<PublisherSortColumns>>;
  public publishersSearchFilter$: Observable<IPublisherSearchFilter>;
  public filteredPublishers$: Observable<IPublisher[]>;

  constructor(
    private _publishersFacade: PublishersFacade,
    private _appFacade: AppFacade) { }

    public ngOnInit(): void {
      this._componentActive = true;
      this._appFacade.loadPublishers();

      this.publishersSearchFilter$ = this._publishersFacade.getPublishersSearchFilter();
      this.sortCriteria$ = this._publishersFacade.getSortCriteria();
      this.filteredPublishers$ = this._publishersFacade.getFilteredPublishers();

      this._publishersFacade.getPublisherDeletedShowInfo().pipe(takeWhile(() => this._componentActive))
      .subscribe((showInfo: boolean) => {
        if (showInfo) {
          window.alert('Publisher has been deleted successfully');
          this._publishersFacade.deletePublisherSuccessShowInfo(false);
          this._appFacade.loadPublishers();
        }
      });
    }

    public ngOnDestroy(): void {
      this._componentActive = false;
    }

    public deletePublisher(PublisherID: number): void {
      if (window.confirm('Are you sure you want to delete this publisher?')) {
        this._publishersFacade.deletePublisher(PublisherID);
      }
    }

    public filterPublishers(PublishersSearchFilter: IPublisherSearchFilter) {
      this._publishersFacade.filterPublishers(PublishersSearchFilter);
    }

    public sortPublishers(column: PublisherSortColumns) {
      this._publishersFacade.sortPublishers(column);
    }
}
