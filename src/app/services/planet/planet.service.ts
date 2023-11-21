import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planet } from '../../models/planet.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private baseUrl = 'https://swapi.dev/api/planets/';

  constructor(private http: HttpClient) {}

  getPlanets(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((response: { results: any; }) => (response.results )),
    );
  }
}
