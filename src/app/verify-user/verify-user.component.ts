import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { VerifyUserGuard } from './verify-user.guard';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit, OnDestroy {
  form: FormGroup;
  verify$: Subject<string> = new Subject();
  destroy$ = new Subject();
  showError = false;
  constructor(
    private userGuard: VerifyUserGuard,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required]
    });
    this.verify$.pipe(switchMap(email => {
      return this.userGuard.validateUserEmail(email);
    }), takeUntil(this.destroy$)).subscribe((res) => {
      if (res) {
        this.userGuard.verify();
      } else {
        this.showError = true;
      }
    });
  }

  verify(): void {
    if (this.form.invalid) {
      return;
    }
    this.verify$.next(this.form.get('email').value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
