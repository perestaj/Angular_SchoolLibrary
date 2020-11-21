import { IPublisher } from '../shared/models/publisher.model';
import { IAuthor } from '../shared/models/author.model';
import { createFeatureSelector, createSelector, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { Actions, ActionTypes } from './app.actions';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '../router/custom-serializer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';

export interface IMainState {
    publishers: IPublisher[];
    authors: IAuthor[];
}

const initialMainState: IMainState = {
    publishers: [],
    authors: []
};

const getMainState = createFeatureSelector<IMainState>('main');

export const getPublishers = createSelector(
    getMainState,
    state => state.publishers
);

export const getAuthors = createSelector(
    getMainState,
    state => state.authors
);

export function mainReducer(state: IMainState = initialMainState, action: Actions): IMainState {
    switch (action.type) {
        case ActionTypes.LoadAuthorsSuccess:
            return {...state, authors: action.payload};
        case ActionTypes.LoadPublishersSuccess:
            return {...state, publishers: action.payload};

        default:
            return state;
    }
}


export interface IState {
    main: IMainState;
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<IState> = {
    main: mainReducer,
    router: routerReducer
};

export const metaReducers: MetaReducer<IState>[] = !environment.production ? [storeFreeze] : [];

const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const getRouterInfo = createSelector(
    getRouterState,
    state => state && state.state
);

export const getRouterParams = createSelector(
    getRouterInfo,
    state => state && state.params
);

