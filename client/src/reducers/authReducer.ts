import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from '../actions/types';
import { AuthAction } from '../actions/authActions.ts';

interface AuthState {
    isAuthenticated: boolean;
    tokenObject: string | null;
    user: string | null;
    error: {
        message: string;
        code?: number;
    } | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    tokenObject: null,
    user: null,
    error: null,
};

const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                tokenObject: action.payload.token,
                user: action.payload.user,
                error: null
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                tokenObject: null,
                user: null,
                error: {
                    message: action.payload.error
                }
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                tokenObject: null,
                user: null,
                error: null
            };
        default:
            return state;
    }
};

export default authReducer;
