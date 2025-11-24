import { createAction, props } from '@ngrx/store';
import {LoginRequest , User } from '../../shared/models/user.model';

export const login = createAction(
    '[Auth] Login',
    props<{ request: LoginRequest }>()
);
export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ token: string, user: User }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');