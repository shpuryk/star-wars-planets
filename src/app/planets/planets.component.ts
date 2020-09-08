import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/api.service';
import { Observable, throwError } from 'rxjs';
import { Planet } from './planets.models';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {

  planets$: Observable<Planet[]>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.planets$ = this.api.getPlanets().pipe(
      catchError(error => throwError(error))
    );
  }

  openPlanetInfo(name: string): void {
    this.router.navigate(['planets', name]);
  }

  isVisible(): boolean {
    return this.route.children ? this.route.children.length === 0 : true;
  }

}
