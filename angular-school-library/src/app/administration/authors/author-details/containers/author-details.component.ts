import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IAuthor } from '../../../../shared/models/author.model';
import { Observable } from 'rxjs';
import { AuthorsFacade } from '../../state/authors.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-details',
  templateUrl: 'author-details.component.html',
  styleUrls: ['author-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorDetailsComponent implements OnInit, OnDestroy {
  public isEditMode$: Observable<boolean>;
  public author$: Observable<IAuthor>;

  constructor(private _authorsFacade: AuthorsFacade, private _router: Router) { }

  public ngOnInit(): void {
    this._authorsFacade.loadAuthor();

    this.author$ = this._authorsFacade.getAuthor();
    this.isEditMode$ = this._authorsFacade.getIsEditMode();
  }

  public ngOnDestroy(): void {
    this._authorsFacade.clearAuthor();
  }

  public edit() {
    this._authorsFacade.setIsEditMode(true);
  }

  public cancelEdit() {
    this._authorsFacade.setIsEditMode(false);
  }

  public save(author: IAuthor) {
    this._authorsFacade.save(author);
  }

  public redirectToAuthorsList() {
    this._router.navigate(['/administration/authors']);
  }
}
