import jwt_decode from 'jwt-decode';
import { AuthAction, CreateUserDto, TokenData, UserData } from '@/types/auth';
import { Dispatch } from 'react';
import axios from '../../../node_modules/axios/index';
import { apiUrl } from '../API/apiConfig';


export const registrationRequest = (userData: CreateUserDto): AuthAction => ({
    type: 'REGISTRATION_REQUEST',
    payload: userData,
});


export const registrationSuccess = (tokenData: TokenData): AuthAction => {


    if (tokenData) {
        localStorage.setItem('token', tokenData.token);
    } else {
        localStorage.removeItem('token');
    }

    return {
        type: 'REGISTRATION_SUCCESS',
        payload: {
            token: tokenData.token,
            user: tokenData.user,
        },
    };
};


export const registrationFailure = (error: string): AuthAction => ({
    type: 'REGISTRATION_FAILURE',
    payload: error,
});


export const logoutUser = (): AuthAction => {

    localStorage.removeItem('token');


    return {
        type: 'LOGOUT',
    };
};


export const registerUser = (userData: CreateUserDto) => async (dispatch: Dispatch<AuthAction>) => {
    try {
        dispatch(registrationRequest(userData));

        const response = await axios.post(`${apiUrl}/auth/registration`, userData);
        const user=jwt_decode<UserData>(response.data.token)
        const tokenData: TokenData = {
            token: response.data.token,
            user: user,
        };

        dispatch(registrationSuccess(tokenData));
    } catch (error) {
        dispatch(registrationFailure('Ошибка регистрации'));
    }
};
