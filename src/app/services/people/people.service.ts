import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {Person} from "../../models/person.model";

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private apiUrl = 'https://swapi.dev/api/people';

  constructor(private http: HttpClient) {}

  getPeople(page: number): Observable<Person[]> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<any>(url).pipe(
      map((response) =>
        response.results.map((result: any) => ({
          name: result.name,
          gender: result.gender,
          birthYear: result.birth_year,
        }))
      )
    );
  }
}
