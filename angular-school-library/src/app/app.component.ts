import { Component, OnInit } from '@angular/core';
import { AuthenticationFacade } from './authentication/state/authentication.facade';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private _authenticationFacade: AuthenticationFacade) { }

  public ngOnInit(): void {
    this._authenticationFacade.authorizeFromLocalStorage();
  }
}
