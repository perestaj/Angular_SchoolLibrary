import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPublisherSearchFilter } from '../../../models/publishers-search-filter.model';

@Component({
  selector: 'app-publishers-search-panel',
  templateUrl: 'publishers-search-panel.component.html',
  styleUrls: ['publishers-search-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublishersSearchPanelComponent implements OnInit {
  @Input() publishersSearchFilter: IPublisherSearchFilter;
  @Output() filterPublishersList = new EventEmitter<IPublisherSearchFilter>();

  public publishersSearchPanelForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  public ngOnInit(): void {
    this.publishersSearchPanelForm = this._fb.group({
      name: this.publishersSearchFilter.name,
      address: this.publishersSearchFilter.address,
      additionalInformation: this.publishersSearchFilter.additionalInformation
    });

    this.publishersSearchPanelForm.valueChanges.subscribe(value => this.filterPublishersList.emit(<IPublisherSearchFilter> value));
  }
}
