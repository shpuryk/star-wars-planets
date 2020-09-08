import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Planet } from '../planets.models';

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.scss']
})
export class PlanetInfoComponent implements OnInit, OnDestroy {

  planetName: string;
  planet: Planet;
  destroy$ = new Subject();
  errorMsg: string;
  loading = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private api: ApiService
  ) {
    this.planetName = this.activeRoute.snapshot.params.name;
  }

  ngOnInit(): void {
    this.loading = true;
    this.api.getPlanet(this.planetName).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading = false)
    ).subscribe(planet => {
      this.planet = planet;
    }, (e) => this.handleError(e));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  handleError(errorMsg): void {
    this.errorMsg = errorMsg;
  }

}
