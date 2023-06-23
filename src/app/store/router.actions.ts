import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

export const GO = '[Task List Component] Go';
export const BACK = '[Task List Component] Back';
export const FORWARD = '[Task List Component] Forward';

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: any[];
      queryParams?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class GoBack implements Action {
  readonly type = BACK;
  constructor(
    public payload: {
      path: any[];
      queryParams?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class GoForward implements Action {
  readonly type = FORWARD;
  constructor(
    public payload: {
      path: any[];
      queryParams?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export type RouterActions = Go | GoBack | GoForward;
