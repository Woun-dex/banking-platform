import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthState } from '../../state/auth/auth.selectors';
import { switchMap, take } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  
  return store.select(selectAuthState).pipe(
    take(1),
    switchMap(authState => {
      console.log('🔐 Interceptor - Token exists:', !!authState.token);
      console.log('🔐 Interceptor - Request URL:', req.url);
      
      if (authState.token) {
        console.log('🔐 Adding token to request:', authState.token.substring(0, 30) + '...');
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authState.token}`
          }
        });
        return next(cloned);
      }
      console.log('🔐 No token available, sending request without auth');
      return next(req);
    })
  );
};