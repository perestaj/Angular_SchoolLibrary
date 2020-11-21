import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IUserRole } from '../../models/user-role.model';
import { IUser } from '../../models/user.model';
import { IUserUpdateResult } from '../../models/user-update-result.model';
import { Observable } from 'rxjs';
import { UsersFacade } from '../../state/users.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: ['user-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public isEditMode$: Observable<boolean>;
  public user$: Observable<IUser>;
  public roles$: Observable<IUserRole[]>;
  public userUpdateResult: IUserUpdateResult;

  constructor(private _usersFacade: UsersFacade, private _router: Router) { }

  public ngOnInit(): void {
    this._usersFacade.loadRoles();
    this._usersFacade.loadUser();

    this.roles$ = this._usersFacade.getRoles();
    this.user$ = this._usersFacade.getUser();
    this.isEditMode$ = this._usersFacade.getIsEditMode();
  }

  public ngOnDestroy(): void {
    this._usersFacade.clearUser();
  }

  public edit(): void {
    this._usersFacade.setIsEditMode(true);
  }

  public cancelEdit(): void {
    this._usersFacade.setIsEditMode(false);
  }

  public save(user: IUser): void {
    this._usersFacade.save(user);
  }

  public redirectToUsersList() {
    this._router.navigate(['/administration/users']);
  }
}
