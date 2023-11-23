import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { PeopleEffects } from './people.effects';
import * as PeopleActions from './people.actions';
import { PeopleService } from '../../services/people/people.service';

describe('PeopleEffects', () => {
  let effects: PeopleEffects;
  let actions$: Observable<any>;
  let peopleServiceSpy: jasmine.SpyObj<PeopleService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PeopleService', ['getPeople']);

    TestBed.configureTestingModule({
      providers: [
        PeopleEffects,
        provideMockActions(() => actions$),
        { provide: PeopleService, useValue: spy },
      ],
    });

    effects = TestBed.inject(PeopleEffects);
    actions$ = TestBed.inject(Actions);
    peopleServiceSpy = TestBed.inject(PeopleService) as jasmine.SpyObj<PeopleService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch loadPeopleSuccess action on successful API call', (done: DoneFn) => {
    const page = 1;
    const mockPeople = [
      { name: 'Luke Skywalker', gender: 'male', birthYear: '19 BBY' },
      { name: 'Leia Organa', gender: 'female', birthYear: '19 BBY' },
    ];

    peopleServiceSpy.getPeople.and.returnValue(of(mockPeople));

    actions$ = of(PeopleActions.loadPeople({ page }));

    effects.loadPeople$.subscribe((resultAction) => {
      expect(resultAction).toEqual(PeopleActions.loadPeopleSuccess({ page, people: mockPeople }));
      done();
    });
  });

  it('should dispatch loadPeopleFailure action on API error', (done: DoneFn) => {
    const page = 1;
    const error = new Error('An error occurred');

    peopleServiceSpy.getPeople.and.returnValue(throwError(error));

    actions$ = of(PeopleActions.loadPeople({ page }));

    effects.loadPeople$.subscribe((resultAction) => {
      expect(resultAction).toEqual(PeopleActions.loadPeopleFailure({ page, error }));
      done();
    });
  });
});