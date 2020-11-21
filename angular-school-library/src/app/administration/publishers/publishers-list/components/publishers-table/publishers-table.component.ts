import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IPublisher } from '../../../../../shared/models/publisher.model';

import { PublisherSortColumns } from '../../../models/publisher-sort-columns';

@Component({
  selector: 'app-publishers-table',
  templateUrl: 'publishers-table.component.html',
  styleUrls: ['publishers-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublishersTableComponent {
  @Input() publishers: IPublisher[];
  @Input() sortColumn: string;

  @Output() sortPublishersList = new EventEmitter<string>();
  @Output() deletePublisher = new EventEmitter<number>();

  public publisherColumns = PublisherSortColumns;

  constructor() { }
}
