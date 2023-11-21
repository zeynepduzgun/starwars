import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as PlanetActions from './planet.actions';
import { PlanetService } from '../../services/planet/planet.service';

@Injectable()
export class PlanetEffects {
  loadPeople$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PlanetActions.loadPlanet),
    switchMap(() =>
      this.planetService.getPlanets().pipe(
        tap((planet) => console.log('Planet retrieved:', planet)),
        map((planet) => PlanetActions.loadPlanetSuccess({ planet })),
        catchError((error) => {
          console.error('Error loading planet:', error);
          return of(PlanetActions.loadPlanetFailure({ error }));
        })
      )
    )
  )
);

  constructor(
    private actions$: Actions,
    private planetService: PlanetService
  ) {}
}
