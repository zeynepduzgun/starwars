import { Component } from '@angular/core';
import * as PlanetActions from '../../state/planet/planet.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPlanet, selectPlanetLoading, selectPlanetError } from '../../state/planet/planet.selectors';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrl: './planet.component.scss'
})
export class PlanetComponent {
  planet$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.planet$ = this.store.select(selectPlanet);
    this.loading$ = this.store.select(selectPlanetLoading);
    this.error$ = this.store.select(selectPlanetError);
  }

  ngOnInit() {
    this.store.dispatch(PlanetActions.loadPlanet());
  }
  formatPopulation(population: string): string {
    return population.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}

