import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const EMAIL_REGEX = /\S+@\S+/;

@Injectable({
  providedIn: 'root'
})
export class VerifyUserGuard implements CanActivate {
  private isVerified = false;
  private previousUrl;
  constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.isVerified) {
      this.router.navigate(['verify']);
      this.previousUrl = state.url;
    }
    return this.isVerified;
    // return true;
  }

  verify(): void {
    this.isVerified = true;
    this.previousUrl ?
      this.router.navigateByUrl(this.previousUrl) :
      this.router.navigate(['planets']);
  }

  validateUserEmail(email: string): Observable<boolean> {
    return of(EMAIL_REGEX.test(email)).pipe(delay(500));
  }
}
