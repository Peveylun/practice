import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
    error: null,
};

const authReducer = (state = initialState, action: { type: string; payload: { token: string; user: string; error: string; }; }) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user,
                error: null
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
                error: action.payload.error
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
                error: null
            };
        default:
            return state;
    }
};

export default authReducer;
