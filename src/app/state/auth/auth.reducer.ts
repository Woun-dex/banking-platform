import { createReducer , on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../shared/models/user.model';

export interface AuthState {
    user: User | null;
    token: string | null;
    error: any | null;
    isLoading: boolean;
}

export const initialAuthState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    error: null,
    isLoading: false,
}

export const authReducer = createReducer(
    initialAuthState,

    on(AuthActions.login, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(AuthActions.loginSuccess, (state, { user }) => ({
        ...state,
        user,
        isLoading: false,
        error: null

    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
        ...state,
        error,
        isLoading: false
    })),

    on(AuthActions.logout, (state) => ({
        ...state,
        user: null,
        token: null,
        error: null
    }))
);
    