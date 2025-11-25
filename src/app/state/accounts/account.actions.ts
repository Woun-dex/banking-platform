import { createAction , props } from "@ngrx/store";
import { AccountResponse } from "../../shared/models/account.model";

export const loadAccounts = createAction(
    '[Account] Load Accounts',
    props<{ userId: string }>()
);
export const loadAccountsSuccess = createAction(
    '[Account] Load Accounts Success',
    props<{ accounts: AccountResponse[] }>()
);
export const loadAccountsFailure = createAction(
    '[Account] Load Accounts Failure',
    props<{ error: any }>()
);

export const createAccount = createAction(
    '[Account] Create Account',
    props<{ accountData: any }>()
);

export const createAccountSuccess = createAction(
    '[Account] Create Account Success',
    props<{ account: AccountResponse }>()
);

export const createAccountFailure = createAction(
    '[Account] Create Account Failure',
    props<{ error: any }>()
);
