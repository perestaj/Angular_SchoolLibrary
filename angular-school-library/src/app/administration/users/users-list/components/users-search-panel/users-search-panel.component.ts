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
    return <FormArray>this.usersSearchPanelForm.get('userRoles');
  }

  constructor(private _fb: FormBuilder) {
    this.usersSearchPanelForm = this._fb.group({
      fullName: '',
      email: '',
      address: '',
      userRoles: this._fb.array([])
    });
  }

  public ngOnInit(): void {
    const userRolesFormArray = <FormArray>this.usersSearchPanelForm.get('userRoles');

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
    return this._fb.group({
           id: 0,
           name: '',
           selected: false
         });
  }
}
