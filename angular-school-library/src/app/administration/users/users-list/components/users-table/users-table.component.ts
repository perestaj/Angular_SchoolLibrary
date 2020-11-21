import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { UserSortColumns } from '../../../models/user-sort-columns';
import { IUser } from '../../../models/user.model';


@Component({
  selector: 'app-users-table',
  templateUrl: 'users-table.component.html',
  styleUrls: ['users-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent {
  @Input() users: IUser[];
  @Input() sortColumn: string;

  @Output() sortUsersList = new EventEmitter<string>();
  @Output() deleteUser = new EventEmitter<number>();

  public userColumns = UserSortColumns;
}
