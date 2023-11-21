import { createAction, props } from '@ngrx/store';
import { Film } from '../../models/film.model';

export const loadFilm = createAction('[Film] Load Film');
export const loadFilmSuccess = createAction('[Film] Load Film Success',props<{ film: Film[] }>());
export const loadFilmFailure = createAction('[Film] Load Film Failure',props<{ error: any }>());
