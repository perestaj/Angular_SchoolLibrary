import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IMainState, getPublishers, getAuthors } from './app.reducer';
import * as appActions from 'src/app/state/app.actions';
import { IPublisher } from '../shared/models/publisher.model';
import { Observable } from 'rxjs';
import { IAuthor } from '../shared/models/author.model';

@Injectable()
export class AppFacade {
  constructor(private _store: Store<IMainState>) {}

  public loadPublishers(): void {
    this._store.dispatch(new appActions.LoadPublishersAction());
  }

  public loadAuthors(): void {
    this._store.dispatch(new appActions.LoadAuthorsAction());
  }

  public getPublishers(): Observable<IPublisher[]> {
    return this._store.pipe(select(getPublishers));
  }

  public getAuthors(): Observable<IAuthor[]> {
    return this._store.pipe(select(getAuthors));
  }
}
