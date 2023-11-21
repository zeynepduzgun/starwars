// film.model.ts

export interface Film {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[]; // URLs of characters
    planets: string[]; // URLs of planets
    starships: string[]; // URLs of starships
    vehicles: string[]; // URLs of vehicles
    species: string[]; // URLs of species
    created: string;
    edited: string;
    url: string;
  }
