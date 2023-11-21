import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {peopleReducer} from "./state/people/people.reducer";
import {PeopleService} from "./services/people/people.service";
import {PeopleEffects} from "./state/people/people.effects";
import { PeopleComponent } from './components/people/people.component';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { PlanetComponent } from './components/planet/planet.component';
import { PlanetService } from './services/planet/planet.service';
import { PlanetEffects } from './state/planet/planet.effects';
import { reducers } from './state/app.state';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PlanetComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([PeopleEffects, PlanetEffects]),
  ],
  providers: [PeopleService, PlanetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
