import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PlanetService } from './planet.service';

describe('PlanetService', () => {
  let service: PlanetService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlanetService],
    });

    service = TestBed.inject(PlanetService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch planets data', () => {
    const mockResponse = {
      results: [
        { name: 'Tatooine', population: '200000' },
        { name: 'Alderaan', population: '2000000000' },
      ],
    };

    service.getPlanets().subscribe((planets) => {
      expect(planets.length).toBe(2);
      expect(planets[0].name).toBe('Tatooine');
      expect(planets[0].population).toBe('200000');
      expect(planets[1].name).toBe('Alderaan');
      expect(planets[1].population).toBe('2000000000');
    });

    const req = httpTestingController.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should map API response to planet model', () => {
    const mockResponse = {
      results: [
        { name: 'Hoth', population: 'unknown' },
      ],
    };

    service.getPlanets().subscribe((planets) => {
      expect(planets.length).toBe(1);
      expect(planets[0].name).toBe('Hoth');
      expect(planets[0].population).toBe('unknown');
    });

    const req = httpTestingController.expectOne(service['baseUrl']);
    req.flush(mockResponse);
  });

  it('should handle API error', () => {
    const errorMessage = '404 Not Found';

    service.getPlanets().subscribe(
      () => fail('Expected to fail'),
      (error) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(404);
        expect(error.statusText).toBe(errorMessage);
      }
    );

    const req = httpTestingController.expectOne(service['baseUrl']);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});