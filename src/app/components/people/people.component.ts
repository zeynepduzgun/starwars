import { Component } from '@angular/core';
import {Observable, combineLatest, map, of, switchMap} from "rxjs";
import {Store} from "@ngrx/store";
import {selectPeople, selectPeopleError, selectPeopleLoading} from "../../state/people/people.selectors";
import * as peopleActions from "../../state/people/people.actions";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {
  people$: Observable<any[]>;
  loadingPage1$: Observable<boolean>;
  loadingPage2$: Observable<boolean>;
  errorPage1$: Observable<any>;
  errorPage2$: Observable<any>;

  constructor(private store: Store) {
    this.people$ = combineLatest([
      this.store.select(selectPeople(1)),
      this.store.select(selectPeople(2)),
    ]).pipe(
      map(([peoplePage1, peoplePage2]) => [...peoplePage1, ...peoplePage2])
    );
    this.loadingPage1$ = this.store.select(selectPeopleLoading(1));
    this.loadingPage2$ = this.store.select(selectPeopleLoading(2));
    this.errorPage1$ = this.store.select(selectPeopleError(1));
    this.errorPage2$ = this.store.select(selectPeopleError(2));
  }

  ngOnInit() {
    // Dispatch action to load people for page 1
    this.store.dispatch(peopleActions.loadPeople({ page: 1 }));

    // Wait for page 1 to be loaded, then dispatch action for page 2
    this.loadingPage1$
      .pipe(
        switchMap((loadingPage1) => {
          if (!loadingPage1) {
            // Dispatch action to load people for page 2
            this.store.dispatch(peopleActions.loadPeople({ page: 2 }));
          }
          // Return an observable that completes immediately
          return of(null);
        })
      )
      .subscribe();
  }
}