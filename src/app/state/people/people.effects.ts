import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as PeopleActions from './people.actions';
import {PeopleService} from "../../services/people/people.service";

@Injectable()
export class PeopleEffects {

  loadPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeopleActions.loadPeople),
      switchMap(({ page }) =>
        this.peopleService.getPeople(page).pipe(
          //tap((people: any) => console.log('Load people' , people)),
          map((people) => PeopleActions.loadPeopleSuccess({ page, people })),
          catchError((error) => of(PeopleActions.loadPeopleFailure({ page, error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private peopleService: PeopleService) {}
}
