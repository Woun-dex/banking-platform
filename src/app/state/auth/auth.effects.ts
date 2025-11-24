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
            console.log('🔍 Full login response:', response);
            console.log('🔍 Response keys:', Object.keys(response));

            // Extract token - handle different possible formats
            const token: string = 
              (response as any).access_token ||
              (response as any).token ||
              (response as any).jwt ||
              (response as any).accessToken ||
              '';

            // Validate token exists and is now a string
            if (!token || typeof token !== 'string') {
              console.error('❌ Token extraction failed. Response structure:', response);
              throw new Error('Invalid token received from server: token must be a string');
            }

            console.log('✅ Extracted token:', token.substring(0, 20) + '...');

            // Store token in localStorage (only in browser)
            if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
              localStorage.setItem('token', token);
            }
            
            const decoded: any = jwtDecode(token);
            console.log('🔍 Decoded token:', decoded);
            
            const user = { 
                id: response.userId || (response as any).userId, 
                username: decoded.sub, 
                email: decoded.email, 
                role: decoded.role 
            };

            return AuthActions.loginSuccess({ token, user });
          }),
          catchError((error) => {
            console.error('❌ Login effect error:', error);
            return of(AuthActions.loginFailure({ error: error.message || 'Login Failed' }));
          })
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