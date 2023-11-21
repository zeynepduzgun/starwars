import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFilm, selectFilmLoading, selectFilmError } from '../../state/film/film.selectors';
import * as FilmActions from '../../state/film/film.actions';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss'
})
export class FilmComponent implements OnInit {
  film$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.film$ = this.store.select(selectFilm);
    this.loading$ = this.store.select(selectFilmLoading);
    this.error$ = this.store.select(selectFilmError);
  }

  ngOnInit() {
    this.store.dispatch(FilmActions.loadFilm());
  }
}
