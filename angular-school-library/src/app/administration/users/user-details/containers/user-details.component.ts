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

  constructor(private usersFacade: UsersFacade, private router: Router) { }

  public ngOnInit(): void {
    this.usersFacade.loadRoles();
    this.usersFacade.loadUser();

    this.roles$ = this.usersFacade.getRoles();
    this.user$ = this.usersFacade.getUser();
    this.isEditMode$ = this.usersFacade.getIsEditMode();
  }

  public ngOnDestroy(): void {
    this.usersFacade.clearUser();
  }

  public edit(): void {
    this.usersFacade.setIsEditMode(true);
  }

  public cancelEdit(): void {
    this.usersFacade.setIsEditMode(false);
  }

  public save(user: IUser): void {
    this.usersFacade.save(user);
  }

  public redirectToUsersList(): void {
    this.router.navigate(['/administration/users']);
  }
}
