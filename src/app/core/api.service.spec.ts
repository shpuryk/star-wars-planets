import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Planet } from '../planets/planets.models';

describe('ApiService', () => {
  let service: ApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let expectedPlanets: Planet[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  beforeEach(() => {
    expectedPlanets = [
      { name: 'Planet1' },
      { name: 'Planet2' },
    ] as Planet[];
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    service.getPlanets().subscribe(
      planets => expect(planets).toEqual(expectedPlanets, 'should return expected planets'),
      fail
    );

    const req = httpTestingController.expectOne(service.planetsUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedPlanets);
  });
});
