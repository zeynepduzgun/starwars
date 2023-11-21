import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as FilmActions from './film.actions';
import { FilmService } from '../../services/film/film.service';

@Injectable()
export class FilmEffects {
  loadFilm$ = createEffect(() =>
  this.actions$.pipe(
    ofType(FilmActions.loadFilm),
    switchMap(() =>
      this.filmService.getFilms().pipe(
        tap((film) => console.log('Film retrieved:', film)),
        map((film) => FilmActions.loadFilmSuccess({ film })),
        catchError((error) => {
          console.error('Error loading film:', error);
          return of(FilmActions.loadFilmFailure({ error }));
        })
      )
    )
  )
);

  constructor(
    private actions$: Actions,
    private filmService: FilmService
  ) {}
}
