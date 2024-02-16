import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';

export interface AuthAction {
    type: string;
    payload: { tokenObject: string; user: string; error: string; };
}

export const loginSuccess = (token: string, user: string) => ({
    type: LOGIN_SUCCESS,
    payload: { token, user }
});

export const loginFailure = (error: string) => ({
    type: LOGIN_FAILURE,
    payload: { error }
});

export const logout = () => ({
    type: LOGOUT
});
