import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usersActions from './users.actions';
import { UsersService } from '../users.service';
import { mergeMap, map, withLatestFrom, switchMap, tap, catchError } from 'rxjs/operators';
import { pipe, of, Observable, empty, EMPTY } from 'rxjs';
import { Store, select, Action } from '@ngrx/store';
import { getUsersSortCriteria, getUsersSearchFilter } from './users.reducer';
import { getRouterParams } from 'src/app/state/app.reducer';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';
import { IUserRole } from '../models/user-role.model';
import { IUserRoleSearch, IUserSearchFilter } from '../models/users-search-filter.model';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private router: Router,
    private store: Store<any>) { }

    @Effect()
    loadDefaultSearchFilter$ = this.actions$.pipe(
        ofType(usersActions.ActionTypes.LoadDefaultSearchFilter),
        withLatestFrom(this.store.pipe(select(getUsersSearchFilter))),
        switchMap(([, filter]) => {
          if (!filter || !filter.userRoles || filter.userRoles.findIndex(x => x.id === 0) > -1) {
            return this.usersService.getRoles().pipe(
              map((roles: IUserRole[]) => {

              const userRoleSearchFilter = roles.map(role => {
                  return {
                    id: role.id,
                    name: role.name,
                    selected: true
                  };
                });

              const defaultFilter: IUserSearchFilter = {
                fullName: '',
                email: '',
                address: '',
                userRoles: userRoleSearchFilter
              };

              return new usersActions.FilterUsersAction(defaultFilter);
          }));
          } else {
            return EMPTY;
          }
        })
    );

    @Effect()
    loadRoles$ = this.actions$.pipe(
      ofType(usersActions.ActionTypes.LoadRoles),
      mergeMap(() => this.usersService.getRoles().pipe(
        map((roles: IUserRole[]) => new usersActions.LoadRolesSuccessAction(roles)),
        catchError((err, caught) => {
          // error handled by http interceptor
          return EMPTY;
        }
      ))
    ));

    @Effect()
    loadUsers$ = this.actions$.pipe(
        ofType(usersActions.ActionTypes.LoadUsers),
        mergeMap(() => this.usersService.getUsers().pipe(
            map((users: IUser[]) => new usersActions.LoadUsersSuccessAction(users)),
            catchError((err, caught) => {
              // error handled by http interceptor
              return EMPTY;
            }
        ))
    ));

    @Effect()
    sortUsers$ = this.actions$.pipe(
        ofType(usersActions.ActionTypes.SortUsers),
        pipe(
            map((action: usersActions.SortUsersAction) => action.payload),
            withLatestFrom(this.store.pipe(select(getUsersSortCriteria))),
            switchMap(([column, oldCriteria]) => {
                return of(new usersActions.SortUsersSuccessAction({
                    sortColumn: column,
                    sortOrderDesc: oldCriteria && column === oldCriteria.sortColumn ? !oldCriteria.sortOrderDesc : false
                  }));
            })
        )
    );

    @Effect()
    public loadUser$: Observable<Action> = this.actions$.pipe(
      ofType(usersActions.ActionTypes.LoadUser),
      pipe(
        withLatestFrom(this.store.pipe(select(getRouterParams))),
        switchMap(([, params]) => {
          let id = 0;

          if (params && params['id']) {
            id = +params['id'];
          }

          return id > 0
            ? this.usersService
                .getUser(id)
                .pipe(
                  map(
                    (User: IUser) => new usersActions.LoadUserSuccessAction(User)
                  ),
                  catchError((err, caught) => {
                    // error handled by http interceptor
                    return EMPTY;
                  })
                )
            : of(
                new usersActions.LoadUserSuccessAction({
                  address: '',
                  email: '',
                  firstName: '',
                  fullName: '',
                  isDeleted: false,
                  lastName: '',
                  password: '',
                  passwordConfirm: '',
                  role: '',
                  roleName: '',
                  userID: 0,
                  userName: ''
                })
              );
        })
      )
    );

  @Effect()
  deleteUser$ = this.actions$.pipe(
    ofType(usersActions.ActionTypes.DeleteUser),
    mergeMap((action: usersActions.DeleteUserAction) =>
      this.usersService
        .deleteUser(action.payload)
        .pipe(
          map(() => new usersActions.DeleteUserSuccessShowInfoAction(true)),
          catchError((err, caught) => {
            // error handled by http interceptor
            return EMPTY;
          })
        )
    )
  );

  @Effect({ dispatch: false })
  saveUser$ = this.actions$.pipe(
    ofType(usersActions.ActionTypes.SaveUser),
    mergeMap((action: usersActions.SaveUserAction) =>
      this.usersService
        .updateUser(action.payload)
        .pipe(tap(() => this.router.navigate(['/administration/users'])),
        catchError((err, caught) => {
          // error handled by http interceptor
          return EMPTY;
        })
        )
    )
  );
}
