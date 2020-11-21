import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ILoanSearchFilter } from '../../../models/loan-search-filter.model';

@Component({
  selector: 'app-loans-search-panel',
  templateUrl: 'loans-search-panel.component.html',
  styleUrls: ['loans-search-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoansSearchPanelComponent implements OnInit {
  @Input() filter: ILoanSearchFilter;

  @Output() filterLoansList = new EventEmitter<ILoanSearchFilter>();

  public loansSearchPanelForm: FormGroup;

  get statuses(): FormArray {
    return <FormArray>this.loansSearchPanelForm.get('bookStatuses');
  }

  constructor(private _fb: FormBuilder) {
    this.loansSearchPanelForm = this._fb.group({
      title: '',
      user: '',
      bookStatuses: this._fb.array([])
    });
  }

  public ngOnInit(): void {
    if (this.filter) {
      const bookStatusesFormArray = <FormArray>this.loansSearchPanelForm.get('bookStatuses');

      this.filter.bookStatuses.forEach(status => bookStatusesFormArray.push(this.buildBookStatusGroup()));
    }

    this.loansSearchPanelForm.patchValue({
      title: this.filter.title,
      user: this.filter.user,
      bookStatuses: this.filter.bookStatuses
    });

    this.loansSearchPanelForm.valueChanges
        .subscribe(value => this.filterLoansList.emit(<ILoanSearchFilter>value));
  }

  private buildBookStatusGroup(): FormGroup {
    return this._fb.group({
      id: 0,
      name: '',
      selected: false
    });
  }
}
