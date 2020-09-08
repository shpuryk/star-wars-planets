import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Planet } from '../planets/planets.models';

describe('ApiService', () => {
  let service: ApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let expectedPlanet: Planet;
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

    expectedPlanet = {
      name: 'Planet1'
    } as Planet;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return planets', () => {
    service.getPlanets().subscribe(
      planets => expect(planets).toEqual(expectedPlanets, 'should return expected planets'),
      fail
    );
    const req = httpTestingController.expectOne(service.planetsUrl);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedPlanets);
  });

  it('should turn error into empty list of planets', () => {
    service.getPlanets().subscribe(
      planets => expect(planets).toEqual([], 'should return empty list'),
      fail
    );
    const req = httpTestingController.expectOne(service.planetsUrl);
    expect(req.request.method).toEqual('GET');
    req.flush('msg', { status: 404, statusText: 'Not Found' });
  });


  it('should return specific planet', () => {
    service.getPlanet(expectedPlanet.name).subscribe(
      planet => expect(planet).toEqual(expectedPlanet, 'should return expected planet'),
      fail
    );
    const req = httpTestingController.expectOne(service.planetsUrl + '/' + expectedPlanet.name);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedPlanet);
  });

  it('should throw error on getting planet if does not exist', () => {
    service.getPlanet(expectedPlanet.name).subscribe(
      planet => {},
      error => expect(error).toEqual('Planet does not exist')
    );
    const req = httpTestingController.expectOne(service.planetsUrl + '/' + expectedPlanet.name);
    expect(req.request.method).toEqual('GET');
    req.flush('msg', { status: 404, statusText: 'Not Found' });
  });
});
