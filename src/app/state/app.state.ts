import { PlanetState } from './planet/planet.reducer';
import { PeopleState } from './people/people.reducer';
import {peopleReducer} from "../state/people/people.reducer";
import {planetReducer} from "../state/planet/planet.reducer";
import { FilmState, filmReducer } from './film/film.reducer';

export interface AppState {
  planet: PlanetState;
  people: PeopleState;
  film:FilmState;
}
export const reducers = {
    planet: planetReducer,
    people: peopleReducer,
    film: filmReducer
  };
