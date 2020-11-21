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

  constructor(private authorsFacade: AuthorsFacade, private router: Router) { }

  public ngOnInit(): void {
    this.authorsFacade.loadAuthor();

    this.author$ = this.authorsFacade.getAuthor();
    this.isEditMode$ = this.authorsFacade.getIsEditMode();
  }

  public ngOnDestroy(): void {
    this.authorsFacade.clearAuthor();
  }

  public edit(): void {
    this.authorsFacade.setIsEditMode(true);
  }

  public cancelEdit(): void {
    this.authorsFacade.setIsEditMode(false);
  }

  public save(author: IAuthor): void {
    this.authorsFacade.save(author);
  }

  public redirectToAuthorsList(): void {
    this.router.navigate(['/administration/authors']);
  }
}
