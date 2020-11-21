import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAuthorSearchFilter } from '../../../models/authors-search-filter.model';

@Component({
  selector: 'app-authors-search-panel',
  templateUrl: 'authors-search-panel.component.html',
  styleUrls: ['authors-search-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsSearchPanelComponent implements OnInit {
  @Input() authorsSearchFilter: IAuthorSearchFilter;
  @Output() filterAuthorsList = new EventEmitter<IAuthorSearchFilter>();

  public authorsSearchPanelForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.authorsSearchPanelForm = this.formBuilder.group({
      fullName: this.authorsSearchFilter.fullName,
      additionalInformation: this.authorsSearchFilter.additionalInformation
    });

    this.authorsSearchPanelForm.valueChanges.subscribe((value: IAuthorSearchFilter) => this.filterAuthorsList.emit(value));
  }
}
