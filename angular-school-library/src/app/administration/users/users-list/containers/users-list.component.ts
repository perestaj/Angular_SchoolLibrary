import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IUserSearchFilter } from '../../models/users-search-filter.model';
import { IUser } from '../../models/user.model';
import { UserSortColumns } from '../../models/user-sort-columns';
import { Observable } from 'rxjs';
import { UsersFacade } from '../../state/users.facade';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit, OnDestroy {
  private _componentActive: boolean;

  public searchFilter$: Observable<IUserSearchFilter>;

  public filteredUsers$: Observable<IUser[]>;
  public sortCriteria$: Observable<ISortCriteria<UserSortColumns>>;

  constructor(private _usersFacade: UsersFacade) { }

  public ngOnInit(): void {
    this._componentActive = true;

    this._usersFacade.loadDefaultSearchFilter();
    this._usersFacade.loadUsers();

    this.sortCriteria$ = this._usersFacade.getSortCriteria();
    this.searchFilter$ = this._usersFacade.getUsersSearchFilter();

    this.filteredUsers$ = this._usersFacade.getFilteredUsers();

    this._usersFacade.getUserDeletedShowInfo().pipe(
      takeWhile(() => this._componentActive)
    ).subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('The user has been deleted successfully');
        this._usersFacade.deleteUserSuccessShowInfo(false);
        this._usersFacade.loadUsers();
      }
    });
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
  }

  public filterUsers(usersSearchFilter: IUserSearchFilter): void {
    this._usersFacade.filterUsers(usersSearchFilter);
  }

  public sortUsers(column: UserSortColumns): void {
    this._usersFacade.sortUsers(column);
  }

  public deleteUser(userID: number): void {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this._usersFacade.deleteUser(userID);
    }
  }
}
