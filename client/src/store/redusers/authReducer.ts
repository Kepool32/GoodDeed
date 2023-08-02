import { AuthAction, AuthState, TokenData, UserData } from '@/types/auth';
import {AuthActionType, AuthActionTypes } from '@/types/AuthActionTypes';



const initialState: AuthState = {
    loading: false,
    token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') || '' : '',
    user: null,
    error: '',
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case AuthActionType.REGISTRATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: '',
            };

        case AuthActionType.REGISTRATION_SUCCESS:
            const tokenData = action.payload;

            localStorage.setItem('token', tokenData.token);

            return {
                ...state,
                loading: false,
                token: tokenData.token,
                user: tokenData.user,
                error: '',
            };

        case AuthActionType.REGISTRATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case AuthActionType.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                loading: false,
                token: '',
                user: null,
                error: '',
            };

        default:
            return state;
    }
};

export default authReducer;
