import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {

  constructor(private router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  openInfo(): void {
    this.router.navigate(['planets', Math.floor(Math.random() * 100)]);
  }

}
