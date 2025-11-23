import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { authReducer } from './state/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './state/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideStore({auth: authReducer}),
    provideEffects([AuthEffects]),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([]), withFetch())
  ]
};
