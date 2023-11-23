import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PeopleService } from './people.service';
import { throwError } from 'rxjs';

describe('PeopleService', () => {
  let service: PeopleService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeopleService],
    });

    service = TestBed.inject(PeopleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch people data', () => {
    const mockPage = 1;
    const mockResponse = {
      results: [
        { name: 'Luke Skywalker', gender: 'male', birth_year: '19 BBY' },
        { name: 'Leia Organa', gender: 'female', birth_year: '19 BBY' },
      ],
    };

    service.getPeople(mockPage).subscribe((people) => {
      expect(people.length).toBe(2);
      expect(people[0].name).toBe('Luke Skywalker');
      expect(people[0].gender).toBe('male');
      expect(people[0].birthYear).toBe('19 BBY');
      expect(people[1].name).toBe('Leia Organa');
      expect(people[1].gender).toBe('female');
      expect(people[1].birthYear).toBe('19 BBY');
    });

    const req = httpTestingController.expectOne(`${service['apiUrl']}?page=${mockPage}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle API error', () => {
    const mockPage = 1;
    const errorMessage = 'Error fetching people data';

    service.getPeople(mockPage).subscribe(
      () => fail('Expected to fail'),
      (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe(errorMessage);
      }
    );

    const req = httpTestingController.expectOne(`${service['apiUrl']}?page=${mockPage}`);
    req.error(new ErrorEvent('network error', { message: errorMessage }));
  });

  it('should handle unexpected API response format', () => {
    const mockPage = 1;
    const mockResponse = { // Incorrect response format
      data: [
        { personName: 'Luke Skywalker', gender: 'male', birthYear: '19 BBY' },
        { personName: 'Leia Organa', gender: 'female', birthYear: '19 BBY' },
      ],
    };

    service.getPeople(mockPage).subscribe(
      () => fail('Expected to fail'),
      (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe('Unexpected response format');
      }
    );

    const req = httpTestingController.expectOne(`${service['apiUrl']}?page=${mockPage}`);
    req.flush(mockResponse);
  });
});