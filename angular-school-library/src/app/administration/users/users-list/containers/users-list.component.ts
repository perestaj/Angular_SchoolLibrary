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
  private componentActive: boolean;

  public searchFilter$: Observable<IUserSearchFilter>;

  public filteredUsers$: Observable<IUser[]>;
  public sortCriteria$: Observable<ISortCriteria<UserSortColumns>>;

  constructor(private usersFacade: UsersFacade) { }

  public ngOnInit(): void {
    this.componentActive = true;

    this.usersFacade.loadDefaultSearchFilter();
    this.usersFacade.loadUsers();

    this.sortCriteria$ = this.usersFacade.getSortCriteria();
    this.searchFilter$ = this.usersFacade.getUsersSearchFilter();

    this.filteredUsers$ = this.usersFacade.getFilteredUsers();

    this.usersFacade.getUserDeletedShowInfo().pipe(
      takeWhile(() => this.componentActive)
    ).subscribe((showInfo: boolean) => {
      if (showInfo) {
        window.alert('The user has been deleted successfully');
        this.usersFacade.deleteUserSuccessShowInfo(false);
        this.usersFacade.loadUsers();
      }
    });
  }

  public ngOnDestroy(): void {
    this.componentActive = false;
  }

  public filterUsers(usersSearchFilter: IUserSearchFilter): void {
    this.usersFacade.filterUsers(usersSearchFilter);
  }

  public sortUsers(column: UserSortColumns): void {
    this.usersFacade.sortUsers(column);
  }

  public deleteUser(userID: number): void {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.usersFacade.deleteUser(userID);
    }
  }
}
