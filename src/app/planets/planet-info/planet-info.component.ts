import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.scss']
})
export class PlanetInfoComponent implements OnInit {

  planetId: number;
  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.planetId = +this.activeRoute.snapshot.params.id;
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['planets']);
  }

}
