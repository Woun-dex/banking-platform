import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from './account.reducer';

export const selectAccountState = createFeatureSelector<AccountState>('accounts');

export const selectAllAccounts = createSelector(
    selectAccountState,
    (state) => state.accounts
);
export const selectAccountsLoading = createSelector(
    selectAccountState,
    (state) => state.loading
);
export const selectAccountsError = createSelector(
    selectAccountState,
    (state) => state.error
);

