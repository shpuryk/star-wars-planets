import { TestBed } from '@angular/core/testing';

import { VerifyUserGuard } from './verify-user.guard';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';

describe('VerifyUserGuard', () => {
  let guard: VerifyUserGuard;
  const routerSpy: Router = jasmine.createSpyObj('routerSpy', ['navigate', 'navigateByUrl']);

  beforeEach(() => {

    TestBed.configureTestingModule({providers: [
      { provide: Router, useValue: routerSpy }
    ]});
    guard = TestBed.inject(VerifyUserGuard);
  });

  it('if not verified should navigate to verify', () => {
    guard.canActivate({} as ActivatedRouteSnapshot, { url: 'someUrl'} as RouterStateSnapshot);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['verify']);
  });

  it('if not verified should not pass', () => {
    const result = guard.canActivate({} as ActivatedRouteSnapshot, { url: 'someUrl'} as RouterStateSnapshot);
    expect(result).toBeFalsy();
  });

  it('if verified should pass', () => {
    guard.verify();
    const result = guard.canActivate({} as ActivatedRouteSnapshot, { url: 'someUrl'} as RouterStateSnapshot);
    expect(result).toBeTruthy();
  });

  it('should navigate to planets on verify if no previous', () => {
    guard.verify();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['planets']);
  });

  it('should navigate to previous on verify ', () => {
    guard.canActivate({} as ActivatedRouteSnapshot, { url: 'someUrl'} as RouterStateSnapshot);
    guard.verify();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('someUrl');
  });

  it('should validate email 1@2', () => {
    guard.validateUserEmail('1@2').pipe(take(1)).subscribe(res => {
      expect(res).toBeTrue();
    });
  });

  it('should not validate email 1@', () => {
    guard.validateUserEmail('1@').pipe(take(1)).subscribe(res => {
      expect(res).toBeFalse();
    });
  });

  it('should not validate email @2', () => {
    guard.validateUserEmail('@2').pipe(take(1)).subscribe(res => {
      expect(res).toBeFalse();
    });
  });

  it('should not validate email 12', () => {
    guard.validateUserEmail('12').pipe(take(1)).subscribe(res => {
      expect(res).toBeFalse();
    });
  });

  it('should not validate email @', () => {
    guard.validateUserEmail('@').pipe(take(1)).subscribe(res => {
      expect(res).toBeFalse();
    });
  });
});
