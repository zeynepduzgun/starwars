import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {PeopleService} from "./services/people/people.service";
import {PeopleEffects} from "./state/people/people.effects";
import { PeopleComponent } from './components/people/people.component';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { PlanetComponent } from './components/planet/planet.component';
import { PlanetService } from './services/planet/planet.service';
import { PlanetEffects } from './state/planet/planet.effects';
import { reducers } from './state/app.state';
import { FilmComponent } from './components/film/film.component';
import { FilmService } from './services/film/film.service';
import { FilmEffects } from './state/film/film.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PlanetComponent,
    FilmComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([PeopleEffects, PlanetEffects, FilmEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [PeopleService, PlanetService,FilmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
