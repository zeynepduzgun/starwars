import { createReducer, on } from '@ngrx/store';
import * as PeopleActions from './people.actions';
import {Person} from "../../models/person.model";


export interface PeopleState {
  data: { [page: number]: Person[] }; 
  loading: { [page: number]: boolean };
  error: { [page: number]: any };
}

export const initialState: PeopleState = {
  data: {},
  loading: {},
  error: {},
};

export const peopleReducer = createReducer(
  initialState,

  on(PeopleActions.loadPeople, (state, { page }) => ({
    ...state,
    loading: { ...state.loading, [page]: true },
    error: { ...state.error, [page]: null },
  })),
  on(PeopleActions.loadPeopleSuccess, (state, { page, people }) => ({
    ...state,
    data: { ...state.data, [page]: people },
    loading: { ...state.loading, [page]: false },
  })),
  on(PeopleActions.loadPeopleFailure, (state, { page, error }) => ({
    ...state,
    loading: { ...state.loading, [page]: false },
    error: { ...state.error, [page]: error },
  }))
);