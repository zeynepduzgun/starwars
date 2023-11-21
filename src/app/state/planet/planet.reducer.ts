import { createReducer, on } from '@ngrx/store';
import * as PlanetActions from './planet.actions';
import { Planet } from '../../models/planet.model';

export interface PlanetState {
  data: Planet[];
  loading: boolean;
  error: any;
}

export const initialState: PlanetState = {
  data: [],
  loading: false,
  error: null,
};

export const planetReducer = createReducer(
  initialState,
  on(PlanetActions.loadPlanet, (state) => ({ ...state, loading: true })),
  on(PlanetActions.loadPlanetSuccess, (state, { planet }) => ({
    ...state,
    data: planet,
    loading: false,
  })),
  on(PlanetActions.loadPlanetFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
