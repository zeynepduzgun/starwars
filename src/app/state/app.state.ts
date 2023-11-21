import { PlanetState } from './planet/planet.reducer';
import { PeopleState } from './people/people.reducer';
import {peopleReducer} from "../state/people/people.reducer";
import {planetReducer} from "../state/planet/planet.reducer";

export interface AppState {
  planet: PlanetState;
  people: PeopleState;
}
export const reducers = {
    planet: planetReducer,
    people: peopleReducer,
  };