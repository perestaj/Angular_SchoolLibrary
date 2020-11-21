import { Injectable } from '@angular/core';
import * as userActions from './users.actions';
import * as userSelectors from './users.reducer';
import { Store, select } from '@ngrx/store';
import { IUserSearchFilter } from '../models/users-search-filter.model';
import { Observable, combineLatest } from 'rxjs';
import { ISortCriteria } from 'src/app/shared/models/sort-criteria.model';
import { UserSortColumns } from '../models/user-sort-columns';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user.model';
import { IUserRole } from '../models/user-role.model';

@Injectable()
export class UsersFacade {
  constructor(private store: Store<userSelectors.IUsersState>) {}

  public loadRoles(): void {
    this.store.dispatch(new userActions.LoadRolesAction());
  }

  public getRoles(): Observable<IUserRole[]> {
    return this.store.pipe(select(userSelectors.getRoles));
  }

  public loadDefaultSearchFilter(): void {
    this.store.dispatch(new userActions.LoadDefaultSearchFilterAction());
  }

  public loadUsers(): void {
    this.store.dispatch(new userActions.LoadUsersAction());
  }

  public loadUser(): void {
    this.store.dispatch(new userActions.LoadUserAction());
  }

  public getUser(): Observable<IUser> {
      return this.store.pipe(select(userSelectors.getUser));
  }

  public clearUser(): void {
    this.store.dispatch(new userActions.ClearUserAction());
  }

  public getIsEditMode(): Observable<boolean> {
    return this.store.pipe(select(userSelectors.getIsEditMode));
  }

  public setIsEditMode(isEditMode: boolean): void {
      this.store.dispatch(new userActions.SetEditModeAction(isEditMode));
  }

  public getFilteredUsers(): Observable<IUser[]> {
    return combineLatest(
      this.store.pipe(select(userSelectors.getUsers)),
      this.store.pipe(select(userSelectors.getUsersSearchFilter)),
      this.store.pipe(select(userSelectors.getUsersSortCriteria))
    ).pipe(
        map(([users, searchFilter, sortCriteria]) => {
            const filteredUsers = this.filter(users, searchFilter);
            this.sort(filteredUsers, sortCriteria.sortColumn, sortCriteria.sortOrderDesc);

            return filteredUsers;
          })
    );
  }

  public getSortCriteria(): Observable<ISortCriteria<UserSortColumns>> {
      return this.store.pipe(select(userSelectors.getUsersSortCriteria));
  }

  public getUsersSearchFilter(): Observable<IUserSearchFilter> {
    return this.store.pipe(select(userSelectors.getUsersSearchFilter));
  }

  public filterUsers(UsersSearchFilter: IUserSearchFilter): void {
    this.store.dispatch(new userActions.FilterUsersAction(UsersSearchFilter));
  }

  public sortUsers(column: UserSortColumns): void {
    this.store.dispatch(new userActions.SortUsersAction(column));
  }

  public deleteUser(UserID: number): void {
    this.store.dispatch(new userActions.DeleteUserAction(UserID));
  }

  public getUserDeletedShowInfo(): Observable<boolean> {
    return this.store.pipe(select(userSelectors.getUserDeletedShowInfo));
  }

  public deleteUserSuccessShowInfo(show: boolean): void {
    this.store.dispatch(new userActions.DeleteUserSuccessShowInfoAction(show));
  }

  public save(User: IUser): void {
    this.store.dispatch(new userActions.SaveUserAction(User));
  }

  private filter(users: IUser[], usersSearchFilter: IUserSearchFilter): IUser[] {
    if (!users || !usersSearchFilter) {
      return users;
    }

    return users.filter(user => {
      const fullNameQuery = !usersSearchFilter.fullName || usersSearchFilter.fullName.length === 0 ||
            user.fullName.toUpperCase().includes(usersSearchFilter.fullName.toUpperCase());

      const emailQuery = !usersSearchFilter.email || usersSearchFilter.email.length === 0 ||
            user.email.toUpperCase().includes(usersSearchFilter.email.toUpperCase());

      const addressQuery = !usersSearchFilter.address || usersSearchFilter.address.length === 0 ||
            user.address.toUpperCase().includes(usersSearchFilter.address.toUpperCase());

      const roleQuery = !usersSearchFilter.userRoles ||
        usersSearchFilter.userRoles.filter(role => role.selected).map(role => role.id).includes(+user.role);

      return fullNameQuery && emailQuery && addressQuery && roleQuery;
    });
  }

  private sort(users: IUser[], column: string, usersSortDesc: boolean): void {
    users.sort((first, second) => {
      let firstField: any;
      let secondField: any;

      if (column === UserSortColumns.FullName) {
        firstField = first.fullName.toUpperCase();
        secondField = second.fullName.toUpperCase();
      } else if (column === UserSortColumns.Email) {
        firstField = first.email.toUpperCase();
        secondField = second.email.toUpperCase();
      } else if (column === UserSortColumns.Address) {
        firstField = first.address.toUpperCase();
        secondField = second.address.toUpperCase();
      } else if (column === UserSortColumns.RoleName) {
        firstField = first.roleName.toUpperCase();
        secondField = second.roleName.toUpperCase();
      } else {
        return 0;
      }

      let comparison = firstField > secondField ? 1 : (firstField < secondField ? -1 : 0);
      if (usersSortDesc) {
        comparison = -comparison;
      }

      return comparison;
    });
  }
}
