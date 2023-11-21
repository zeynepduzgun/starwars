// film.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Film } from '../../models/film.model';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private apiUrl = 'https://swapi.dev/api/films/';

  constructor(private http: HttpClient) {}

  getFilms(): Observable<Film[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response: { results: any; }) => (response.results )),
    );
  }
}
