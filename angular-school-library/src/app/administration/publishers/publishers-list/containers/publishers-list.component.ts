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
  private componentActive: boolean;

  public sortCriteria$: Observable<ISortCriteria<PublisherSortColumns>>;
  public publishersSearchFilter$: Observable<IPublisherSearchFilter>;
  public filteredPublishers$: Observable<IPublisher[]>;

  constructor(
    private publishersFacade: PublishersFacade,
    private appFacade: AppFacade) { }

    public ngOnInit(): void {
      this.componentActive = true;
      this.appFacade.loadPublishers();

      this.publishersSearchFilter$ = this.publishersFacade.getPublishersSearchFilter();
      this.sortCriteria$ = this.publishersFacade.getSortCriteria();
      this.filteredPublishers$ = this.publishersFacade.getFilteredPublishers();

      this.publishersFacade.getPublisherDeletedShowInfo().pipe(takeWhile(() => this.componentActive))
      .subscribe((showInfo: boolean) => {
        if (showInfo) {
          window.alert('Publisher has been deleted successfully');
          this.publishersFacade.deletePublisherSuccessShowInfo(false);
          this.appFacade.loadPublishers();
        }
      });
    }

    public ngOnDestroy(): void {
      this.componentActive = false;
    }

    public deletePublisher(PublisherID: number): void {
      if (window.confirm('Are you sure you want to delete this publisher?')) {
        this.publishersFacade.deletePublisher(PublisherID);
      }
    }

    public filterPublishers(PublishersSearchFilter: IPublisherSearchFilter): void {
      this.publishersFacade.filterPublishers(PublishersSearchFilter);
    }

    public sortPublishers(column: PublisherSortColumns): void {
      this.publishersFacade.sortPublishers(column);
    }
}
