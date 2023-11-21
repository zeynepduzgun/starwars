import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilmState } from './film.reducer';

export const selectFilmState = createFeatureSelector<FilmState>('film');

export const selectFilm = createSelector(
  selectFilmState,
  (state) => state.data
);
export const selectFilmLoading = createSelector(
  selectFilmState,
  (state) => state.loading
);
export const selectFilmError = createSelector(
  selectFilmState,
  (state) => state.error
);
