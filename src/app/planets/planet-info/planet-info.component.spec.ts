import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetInfoComponent } from './planet-info.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { of, throwError } from 'rxjs';
import { Planet } from '../planets.models';

describe('PlanetInfoComponent', () => {
  let component: PlanetInfoComponent;
  let fixture: ComponentFixture<PlanetInfoComponent>;
  const apiMock = { getPlanet: (name) => of({})};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetInfoComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: {params: {name: 'name'}}}},
        { provide: ApiService, useValue: apiMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch planet', () => {
    const expPlanet = {name: 'planet1'} as Planet;
    spyOn(apiMock, 'getPlanet').and.callFake(() => of(expPlanet));
    component.ngOnInit();
    expect(component.planet).toEqual(expPlanet);
  });

  it('should handle error', () => {
    const expPlanet = {name: 'planet1'} as Planet;
    spyOn(apiMock, 'getPlanet').and.callFake(() => throwError('error'));
    component.ngOnInit();
    expect(component.errorMsg).toEqual('error');
  });
});
