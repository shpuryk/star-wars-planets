import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUserComponent } from './verify-user.component';
import { VerifyUserGuard } from './verify-user.guard';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('VerifyUserComponent', () => {
  let component: VerifyUserComponent;
  let fixture: ComponentFixture<VerifyUserComponent>;
  const guardMock = {
    validateUserEmail: () => {},
    verify: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyUserComponent ],
      providers: [ FormBuilder, { provide: VerifyUserGuard, useValue: guardMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form should be initialized', () => {
    component.ngOnInit();
    expect(component.form.value).toEqual({email: ''});
  });

  it('if form is invalid should not pass value', () => {
    spyOn(component.verify$, 'next');
    component.ngOnInit();
    component.verify();
    expect(component.verify$.next).not.toHaveBeenCalled();
  });

  it('if form is valid should pass value', () => {
    spyOn(component.verify$, 'next');
    component.ngOnInit();
    component.form.get('email').setValue('aa');
    component.verify();
    expect(component.verify$.next).toHaveBeenCalled();
  });

  it('if form is valid but email is bad show error', async(() => {
    spyOn(guardMock, 'validateUserEmail').and.callFake(() => of(false));
    component.ngOnInit();
    component.form.get('email').setValue('aa');
    component.verify();
    expect(component.showError).toBeTrue();
  }));

  it('if form is valid and email is good should verify', async(() => {
    spyOn(guardMock, 'validateUserEmail').and.callFake(() => of(true));
    spyOn(guardMock, 'verify');
    component.ngOnInit();
    component.form.get('email').setValue('a@a');
    component.verify();
    expect(guardMock.verify).toHaveBeenCalled();
  }));
});
