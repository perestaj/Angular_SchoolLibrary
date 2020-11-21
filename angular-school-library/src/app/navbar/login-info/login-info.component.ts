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

  constructor(
    private authenticationFacade: AuthenticationFacade,
    private router: Router) { }

  public ngOnInit(): void {
    this.currentUser$ = this.authenticationFacade.getCurrentUser();
  }

  public logoff(): void {
    this.authenticationFacade.logOff();
    this.router.navigate(['/home']);
  }

}
