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
      if (authState.token) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authState.token}`
          }
        });
        return next(cloned);
      }
      return next(req);
    })
  );
};