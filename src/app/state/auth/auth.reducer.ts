import { createReducer , on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../shared/models/user.model';
import { jwtDecode } from 'jwt-decode';

export interface AuthState {
    user: User | null;
    token: string | null;
    error: any | null;
    isLoading: boolean;
}

// Helper function to safely access localStorage
function getStoredToken(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
}

// Helper function to restore user from stored token
function getStoredUser(): User | null {
    const token = getStoredToken();
    if (token) {
        try {
            const decoded: any = jwtDecode(token);
            const userId = localStorage.getItem('userId');
            return {
                id: userId || decoded.sub,
                username: decoded.sub,
                email: decoded.email
            };
        } catch (e) {
            console.error('Failed to decode stored token:', e);
            return null;
        }
    }
    return null;
}

export const initialAuthState: AuthState = {
    user: getStoredUser(),
    token: getStoredToken(),
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
    on(AuthActions.loginSuccess, (state, { token, user }) => ({
        ...state,
        token,
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
    