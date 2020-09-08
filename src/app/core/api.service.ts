import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Planet } from '../planets/planets.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host = 'https://private-anon-21bfdbc69a-starhub.apiary-mock.com';
  planetsUrl =  this.host + '/api/planets';

  constructor(private http: HttpClient) { }

  getPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(this.planetsUrl);
  }

}
