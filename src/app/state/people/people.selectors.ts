import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PeopleState } from './people.reducer';

export const selectPeopleState = createFeatureSelector<PeopleState>('people');

export const selectPeople = (page: number) => createSelector(selectPeopleState, (state) => state.data[page]);
export const selectPeopleLoading = (page: number) => createSelector(selectPeopleState, (state) => state.loading[page]);
export const selectPeopleError = (page: number) => createSelector(selectPeopleState, (state) => state.error[page]);
