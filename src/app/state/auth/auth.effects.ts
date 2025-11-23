import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiService } from '../../core/services/auth-api.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthApiService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.request).pipe(
          map((response) => {

            localStorage.setItem('token', response.token);
            
            const decoded: any = jwtDecode(response.token);
            const user = { 
                id: response.userId, 
                username: decoded.sub, 
                email: '' 
            };

            return AuthActions.loginSuccess({ token: response.token, user });
          }),
          catchError((error) => 
            of(AuthActions.loginFailure({ error: error.message || 'Login Failed' }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
            this.router.navigate(['/dashboard']); // Redirect after login
        })
      ),
    { dispatch: false }
  );
  
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}