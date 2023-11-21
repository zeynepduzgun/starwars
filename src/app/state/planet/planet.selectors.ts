import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlanetState } from './planet.reducer';

export const selectPlanetState = createFeatureSelector<PlanetState>('planet');

export const selectPlanet = createSelector(
  selectPlanetState,
  (state) => state.data
);
export const selectPlanetLoading = createSelector(
  selectPlanetState,
  (state) => state.loading
);
export const selectPlanetError = createSelector(
  selectPlanetState,
  (state) => state.error
);
