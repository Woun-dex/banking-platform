import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { AppComponent } from './app';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login' ,component: LoginComponent},
    {
        path: 'dashboard',
        component: AppComponent,
        canActivate: [authGuard]
    },
    { path : '', redirectTo: 'dashboard', pathMatch: 'full' }
];
