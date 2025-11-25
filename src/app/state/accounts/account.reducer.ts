import { createReducer , on } from "@ngrx/store";
import * as AccountActions from "./account.actions";
import { AccountResponse } from "../../shared/models/account.model";

export interface AccountState {
    accounts: AccountResponse[];
    loading: boolean;
    error: any | null;
}

export const initialState : AccountState = {
    accounts: [],
    loading: false,
    error: null
};
export const accountReducer = createReducer(
    initialState,
    on(AccountActions.loadAccounts, (state) => ({
        ...state,
        loading: true })),
    on(AccountActions.loadAccountsSuccess, (state, { accounts }) => ({
        ...state,
        accounts,
        loading: false,
    })),
    on(AccountActions.loadAccountsFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    on(AccountActions.createAccount, (state) => ({
        ...state,
        loading: true
    })),
    on(AccountActions.createAccountSuccess, (state, { account }) => ({
        ...state,
        accounts: [...state.accounts, account],
        loading: false,
        error: null
    })),
    on(AccountActions.createAccountFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);