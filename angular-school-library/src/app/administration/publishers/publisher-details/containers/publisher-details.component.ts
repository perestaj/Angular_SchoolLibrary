import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IPublisher } from '../../../../shared/models/publisher.model';
import { Observable } from 'rxjs';
import { PublishersFacade } from '../../state/publishers.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publisher-details',
  templateUrl: 'publisher-details.component.html',
  styleUrls: ['publisher-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublisherDetailsComponent implements OnInit, OnDestroy {
  public isEditMode$: Observable<boolean>;
  public publisher$: Observable<IPublisher>;

  constructor(private publishersFacade: PublishersFacade, private router: Router) { }

  public ngOnInit(): void {
    this.publishersFacade.loadPublisher();

    this.publisher$ = this.publishersFacade.getPublisher();
    this.isEditMode$ = this.publishersFacade.getIsEditMode();
  }

  public ngOnDestroy(): void {
    this.publishersFacade.clearPublisher();
  }

  public edit(): void {
    this.publishersFacade.setIsEditMode(true);
  }

  public cancelEdit(): void {
    this.publishersFacade.setIsEditMode(false);
  }

  public save(Publisher: IPublisher): void {
    this.publishersFacade.save(Publisher);
  }

  public redirectToPublishersList(): void {
    this.router.navigate(['/administration/publishers']);
  }
}
