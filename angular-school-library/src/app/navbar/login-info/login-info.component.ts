import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';
import { Observable } from 'rxjs';
import { ICurrentUser } from 'src/app/administration/users/models/current-user.model';

@Component({
  selector: 'app-login-info',
  templateUrl: 'login-info.component.html',
  styleUrls: ['login-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginInfoComponent implements OnInit {
  public currentUser$: Observable<ICurrentUser>;

  constructor(private _authenticationFacade: AuthenticationFacade,
    private _router: Router) { }

  public ngOnInit(): void {
    this.currentUser$ = this._authenticationFacade.getCurrentUser();
  }

  public logoff(): void {
    this._authenticationFacade.logOff();
    this._router.navigate(['/home']);
  }

}
