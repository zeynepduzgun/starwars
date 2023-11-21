import { createReducer, on } from '@ngrx/store';
import * as FilmActions from './film.actions';
import { Film } from '../../models/film.model';

export interface FilmState {
  data: Film[];
  loading: boolean;
  error: any;
}

export const initialState: FilmState = {
  data: [],
  loading: false,
  error: null,
};

export const filmReducer = createReducer(
  initialState,
  on(FilmActions.loadFilm, (state) => ({ ...state, loading: true })),
  on(FilmActions.loadFilmSuccess, (state, { film }) => ({
    ...state,
    data: film,
    loading: false,
  })),
  on(FilmActions.loadFilmFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
