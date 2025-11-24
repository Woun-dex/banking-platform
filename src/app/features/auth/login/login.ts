import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../state/auth/auth.actions';
import { selectIsLoading, selectAuthError } from '../../../state/auth/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styles: [`
    .login-container { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f1f5f9; }
    .login-card { background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
    .header { text-align: center; margin-bottom: 2rem; }
    .form-group { margin-bottom: 1rem; }
    input { width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px; margin-top: 0.5rem; }
    button { width: 100%; background: #2563eb; color: white; padding: 0.75rem; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 1rem; }
    button:disabled { opacity: 0.7; }
    .error-banner { color: #dc2626; background: #fee2e2; padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem; font-size: 0.875rem; }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  isLoading$ = this.store.select(selectIsLoading);
  error$ = this.store.select(selectAuthError);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(AuthActions.login({ 
        request: { username: username!, password: password! } 
      }));
    }
  }
}