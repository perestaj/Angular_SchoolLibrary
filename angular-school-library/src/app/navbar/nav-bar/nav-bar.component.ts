import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationFacade } from 'src/app/authentication/state/authentication.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit {
  public canEditLoans$: Observable<boolean>;
  public canEditAuthors$: Observable<boolean>;
  public canEditPublishers$: Observable<boolean>;
  public canEditUsers$: Observable<boolean>;
  public displayAdministrationLink$: Observable<boolean>;

  constructor(private _authenticationFacade: AuthenticationFacade, public router: Router) { }

  public ngOnInit(): void {
    this.canEditLoans$ = this._authenticationFacade.getCanEditLoans();
    this.displayAdministrationLink$ = this._authenticationFacade.getDisplayAdministrationLink();
    this.canEditAuthors$ = this._authenticationFacade.getCanEditAuthors();
    this.canEditPublishers$ = this._authenticationFacade.getCanEditPublishers();
    this.canEditUsers$ = this._authenticationFacade.getCanEditUsers();
  }

}
