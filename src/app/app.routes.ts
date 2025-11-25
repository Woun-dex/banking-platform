import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { authGuard } from './core/guards/auth.guard';
import { AccountListComponent } from './features/accounts/account-list/account-list.components';
import { AccountDetailComponent } from './features/accounts/account-detail/account-detail.components';
import { AccountCreateComponent } from './features/accounts/account-create/account-create.components';
import { TransferFormComponent } from './features/accounts/transactions/transfer-form/transfer-form.components';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: AccountListComponent, canActivate: [authGuard] },
    { path: 'accounts', component: AccountListComponent, canActivate: [authGuard] },
    { path: 'accounts/create', component: AccountCreateComponent, canActivate: [authGuard] },
    { path: 'accounts/:id', component: AccountDetailComponent, canActivate: [authGuard] },
    { path: 'transactions/new', component: TransferFormComponent, canActivate: [authGuard] }
];
