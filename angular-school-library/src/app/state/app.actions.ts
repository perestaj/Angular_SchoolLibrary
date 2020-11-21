import { Action } from '@ngrx/store';
import { IAuthor } from '../shared/models/author.model';
import { IPublisher } from '../shared/models/publisher.model';

export enum ActionTypes {
    LoadAuthors = '[Author] Load Authors',
    LoadAuthorsSuccess = '[Author] Load Authors Success',
    LoadPublishers = '[Publisher] Load Publishers',
    LoadPublishersSuccess = '[Publisher] Load Publishers Success',
    ErrorOccurred = '[Error] Error Occurred'
}

export class LoadAuthorsAction implements Action {
    public readonly type = ActionTypes.LoadAuthors;

    constructor() { }
}

export class LoadAuthorsSuccessAction implements Action {
    public readonly type = ActionTypes.LoadAuthorsSuccess;

    constructor(public payload: IAuthor[]) { }
}

export class LoadPublishersAction implements Action {
    public readonly type = ActionTypes.LoadPublishers;

    constructor() { }
}

export class LoadPublishersSuccessAction implements Action {
    public readonly type = ActionTypes.LoadPublishersSuccess;

    constructor(public payload: IPublisher[]) { }
}

export class ErrorOccurredAction implements Action {
    public readonly type = ActionTypes.ErrorOccurred;
}

export type Actions = LoadAuthorsAction | LoadAuthorsSuccessAction | LoadPublishersAction | LoadPublishersSuccessAction |
    ErrorOccurredAction;
