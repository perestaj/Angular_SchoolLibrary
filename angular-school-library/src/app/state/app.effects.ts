import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PublishersService } from '../administration/publishers/publishers.service';
import { AuthorsService } from '../administration/authors/authors.service';
import * as mainActions from './app.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { IPublisher } from '../shared/models/publisher.model';
import { IAuthor } from '../shared/models/author.model';
import { of } from 'rxjs';

@Injectable()
export class MainEffects {
    constructor(
      private actions$: Actions,
      private publishersService: PublishersService,
      private authorsService: AuthorsService) { }

    @Effect()
    loadPublishers$ = this.actions$.pipe(
        ofType(mainActions.ActionTypes.LoadPublishers),
        mergeMap((action: mainActions.LoadPublishersAction) => this.publishersService.getPublishers().pipe(
            map((publishers: IPublisher[]) => new mainActions.LoadPublishersSuccessAction(publishers)),
            catchError(err => of(new mainActions.ErrorOccurredAction()))
        ))
    );

    @Effect()
    loadAuthors$ = this.actions$.pipe(
        ofType(mainActions.ActionTypes.LoadAuthors),
        mergeMap((action: mainActions.LoadAuthorsAction) => this.authorsService.getAuthors().pipe(
            map((authors: IAuthor[]) => new mainActions.LoadAuthorsSuccessAction(authors)),
            catchError(err => of(new mainActions.ErrorOccurredAction()))
        ))
    );
}
