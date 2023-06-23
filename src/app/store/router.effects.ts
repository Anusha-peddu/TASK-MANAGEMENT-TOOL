import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {  map, tap } from 'rxjs';
import { BACK, FORWARD, GO, Go, GoBack, GoForward } from './router.actions';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GO),
        map((action: Go) => action.payload ),
        tap(({path, queryParams, extras} ) => {
          this.router.navigate(path, { queryParams, ...extras });
        })
      ),
    { dispatch: false }
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BACK),
        map((action: GoBack) => action.payload ),
        tap(({path, queryParams, extras} ) => {
          this.router.navigate(path, { queryParams, ...extras });
        })
      ),
    { dispatch: false }
  );

  navigateForward$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FORWARD),
        map((action: GoForward) => action.payload ),
        tap(({path, queryParams, extras} ) => {
          this.router.navigate(path, { queryParams, ...extras });
        })
      ),
    { dispatch: false }
  );
}
