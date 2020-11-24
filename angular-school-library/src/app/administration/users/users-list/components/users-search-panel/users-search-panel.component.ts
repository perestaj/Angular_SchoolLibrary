import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IUserSearchFilter } from '../../../models/users-search-filter.model';

@Component({
  selector: 'app-users-search-panel',
  templateUrl: 'users-search-panel.component.html',
  styleUrls: ['users-search-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersSearchPanelComponent implements OnInit {
  @Input() filter: IUserSearchFilter;

  @Output() filterUsersList = new EventEmitter<IUserSearchFilter>();

  public usersSearchPanelForm: FormGroup;

  get roles(): FormArray {
    return this.usersSearchPanelForm.get('userRoles') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    this.usersSearchPanelForm = this.formBuilder.group({
      fullName: '',
      email: '',
      address: '',
      userRoles: this.formBuilder.array([])
    });
  }

  public ngOnInit(): void {
    const userRolesFormArray = this.usersSearchPanelForm.get('userRoles') as FormArray;

    while (userRolesFormArray.length > 0) {
      userRolesFormArray.removeAt(0);
    }

    this.filter.userRoles.forEach(status => userRolesFormArray.push(this.buildUserRoleGroup()));

    this.usersSearchPanelForm.setValue({
      fullName: this.filter.fullName,
      email: this.filter.email,
      address: this.filter.address,
      userRoles: this.filter.userRoles
    });

    this.usersSearchPanelForm.valueChanges.subscribe(value => {
      this.filterUsersList.emit(value);
    });
  }

  private buildUserRoleGroup(): FormGroup {
    return this.formBuilder.group({
           id: 0,
           name: '',
           selected: false
         });
  }
}
