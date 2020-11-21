import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as PublishersActions from './publishers.actions';
import { PublishersService } from '../publishers.service';
import { mergeMap, map, withLatestFrom, switchMap, tap, catchError } from 'rxjs/operators';
import { pipe, of, Observable, empty, EMPTY } from 'rxjs';
import { Store, select, Action } from '@ngrx/store';
import { getPublishersSortCriteria } from './publishers.reducer';
import { getRouterParams } from 'src/app/state/app.reducer';
import { IPublisher } from 'src/app/shared/models/publisher.model';
import { Router } from '@angular/router';

@Injectable()
export class PublishersEffects {
  constructor(
    private actions$: Actions,
    private publishersService: PublishersService,
    private router: Router,
    private store: Store<any>) { }

    @Effect()
    sortPublishers$ = this.actions$.pipe(
        ofType(PublishersActions.ActionTypes.SortPublishers),
        pipe(
            map((action: PublishersActions.SortPublishersAction) => action.payload),
            withLatestFrom(this.store.pipe(select(getPublishersSortCriteria))),
            switchMap(([column, oldCriteria]) => {
                return of(new PublishersActions.SortPublishersSuccessAction({
                    sortColumn: column,
                    sortOrderDesc: oldCriteria && column === oldCriteria.sortColumn ? !oldCriteria.sortOrderDesc : false
                  }));
            })
        )
    );

    @Effect()
    public loadPublisher$: Observable<Action> = this.actions$.pipe(
      ofType(PublishersActions.ActionTypes.LoadPublisher),
      pipe(
        withLatestFrom(this.store.pipe(select(getRouterParams))),
        switchMap(([, params]) => {
          let id = 0;

          if (params && params['id']) {
            id = +params['id'];
          }

          return id > 0
            ? this.publishersService
                .getPublisher(id)
                .pipe(
                  map(
                    (Publisher: IPublisher) => new PublishersActions.LoadPublisherSuccessAction(Publisher)
                  ),
                  catchError((err, caught) => {
                    // error handled by http interceptor
                    return EMPTY;
                  })
                )
            : of(
                new PublishersActions.LoadPublisherSuccessAction({
                  additionalInformation: '',
                  address: '',
                  isDeleted: false,
                  name: '',
                  publisherID: 0
                })
              );
        })
      )
    );

  @Effect()
  deletePublisher$ = this.actions$.pipe(
    ofType(PublishersActions.ActionTypes.DeletePublisher),
    mergeMap((action: PublishersActions.DeletePublisherAction) =>
      this.publishersService
        .deletePublisher(action.payload)
        .pipe(
          map(() => new PublishersActions.DeletePublisherSuccessShowInfoAction(true)),
          catchError((err, caught) => {
            // error handled by http interceptor
            return EMPTY;
          })
        )
    )
  );

  @Effect({ dispatch: false })
  savePublisher$ = this.actions$.pipe(
    ofType(PublishersActions.ActionTypes.SavePublisher),
    mergeMap((action: PublishersActions.SavePublisherAction) =>
      this.publishersService
        .updatePublisher(action.payload)
        .pipe(tap(() => this.router.navigate(['/administration/publishers'])),
        catchError((err, caught) => {
          // error handled by http interceptor
          return EMPTY;
        })
        )
    )
  );
}
