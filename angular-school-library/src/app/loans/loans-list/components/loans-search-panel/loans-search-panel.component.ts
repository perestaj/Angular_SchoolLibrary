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
    return this.loansSearchPanelForm.get('bookStatuses') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    this.loansSearchPanelForm = this.formBuilder.group({
      title: '',
      user: '',
      bookStatuses: this.formBuilder.array([])
    });
  }

  public ngOnInit(): void {
    if (this.filter) {
      const bookStatusesFormArray = this.loansSearchPanelForm.get('bookStatuses') as FormArray;

      this.filter.bookStatuses.forEach(status => bookStatusesFormArray.push(this.buildBookStatusGroup()));
    }

    this.loansSearchPanelForm.patchValue({
      title: this.filter.title,
      user: this.filter.user,
      bookStatuses: this.filter.bookStatuses
    });

    this.loansSearchPanelForm.valueChanges
        .subscribe(value => this.filterLoansList.emit(value as ILoanSearchFilter));
  }

  private buildBookStatusGroup(): FormGroup {
    return this.formBuilder.group({
      id: 0,
      name: '',
      selected: false
    });
  }
}
