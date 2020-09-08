import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Planet } from '../planets/planets.models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host = 'https://private-anon-21bfdbc69a-starhub.apiary-mock.com';
  planetsUrl =  this.host + '/api/planets';

  constructor(private http: HttpClient) { }

  getPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(this.planetsUrl).pipe(
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }

  getPlanet(name: string): Observable<Planet> {
    return this.http.get<Planet>(`${this.planetsUrl}/${name}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          return throwError('Planet does not exist');
        } else {
          return throwError('Something went wrong');
        }
      })
    );
  }
}
