import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsComponent } from './planets.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/api.service';
import { of } from 'rxjs';

describe('PlanetsComponent', () => {
  let component: PlanetsComponent;
  let fixture: ComponentFixture<PlanetsComponent>;
  const routerMock = { navigate: (params) => {}};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetsComponent ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: { children: []}},
        { provide: ApiService, useValue: { getPlanets: () => of([]) }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to planet info', () => {
    spyOn(routerMock, 'navigate');
    component.openPlanetInfo('name');
    expect(routerMock.navigate).toHaveBeenCalledWith(['planets', 'name']);
  });
});
