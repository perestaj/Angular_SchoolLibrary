import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ILogin } from './login.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationFacade } from '../state/authentication.facade';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public invalidUsernamePassword$: Observable<boolean>;

  constructor(private _authenticationFacade: AuthenticationFacade) { }

  public ngOnInit(): void {
    const username = new FormControl('', Validators.required);
    const password = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      username: username,
      password: password
    });

    this.invalidUsernamePassword$ = this._authenticationFacade.getInvalidUsernamePassword()
      .pipe(tap((result: boolean) => {
        if (result) {
          this.loginForm.patchValue( { password: '' } );
        }
      }));
  }

  public signIn(loginData: ILogin): void {
    // tslint:disable-next-line:forin
    for (const field in this.loginForm.controls) {
      const control = this.loginForm.get(field);
      control.markAsTouched( {onlySelf: true } );
    }

    if (this.loginForm.valid) {
      this._authenticationFacade.login(loginData);
    }
  }
}
