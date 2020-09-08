import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetsComponent } from './planets/planets.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { PlanetInfoComponent } from './planets/planet-info/planet-info.component';
import { VerifyUserGuard } from './verify-user/verify-user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'planets',
    pathMatch: 'full',
  },
  {
    path: 'planets',
    canActivate: [VerifyUserGuard],
    component: PlanetsComponent,
    children: [
      {
        path: ':id',
        component: PlanetInfoComponent,
      },
    ],
  },
  {
    path: 'verify',
    component: VerifyUserComponent,
  },
  {
    path: '**',
    redirectTo: 'planets',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
