import { createAction, props } from '@ngrx/store';
import {Person} from "../../models/person.model";


export const loadPeople = createAction('[People] Load', props<{ page: number }>());
export const loadPeopleSuccess = createAction('[People] Load Success', props<{ page: number; people: Person[] }>());
export const loadPeopleFailure = createAction('[People] Load Failure', props<{ page: number; error: any }>());

