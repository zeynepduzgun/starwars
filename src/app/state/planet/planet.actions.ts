import { createAction, props } from '@ngrx/store';
import { Planet } from '../../models/planet.model';

export const loadPlanet = createAction('[Planet] Load Planet');
export const loadPlanetSuccess = createAction('[Planet] Load Planet Success',props<{ planet: Planet[] }>());
export const loadPlanetFailure = createAction('[Planet] Load Planet Failure',props<{ error: any }>());
