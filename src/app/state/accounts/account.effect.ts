import {Injectable , inject} from '@angular/core';
import {Actions , createEffect , ofType} from '@ngrx/effects';
import { AcountApiService } from '../../core/services/account-api.service';
import * as AccountActions from './account.actions';
import { mergeMap , map , catchError , of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AccountEffects {
    private actions$ = inject(Actions);
    private accountService = inject(AcountApiService);
    private router = inject(Router);

    loadAccounts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.loadAccounts),
            mergeMap(action => {
                console.log('Loading accounts for user:', action.userId);
                return this.accountService.getAccountDetails(action.userId).pipe(
                    map(accounts => {
                        console.log('Accounts loaded from API:', accounts);
                        return AccountActions.loadAccountsSuccess({ accounts: Array.isArray(accounts) ? accounts : [accounts] });
                    }),
                    catchError(error => {
                        console.error('Failed to load accounts:', error);
                        return of(AccountActions.loadAccountsFailure({ error: error.message || 'Load Accounts Failed' }));
                    })
                );
            })
        )
    );

    createAccount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.createAccount),
            mergeMap(action => {
                console.log('Creating account with data:', action.accountData);
                return this.accountService.createAccount(action.accountData).pipe(
                    map(account => {
                        console.log('Account created successfully:', account);
                        setTimeout(() => this.router.navigate(['/accounts']), 500);
                        return AccountActions.createAccountSuccess({ account });
                    }),
                    catchError(error => {
                        console.error('Failed to create account:', error);
                        return of(AccountActions.createAccountFailure({ error: error.message || 'Create Account Failed' }));
                    })
                );
            })
        )
    );
}