import { AuthAction, AuthUserDto, TokenData, UserData } from '@/types/auth';
import { Dispatch } from 'react';
import axios from '../../../node_modules/axios/index';
import jwt_decode from 'jwt-decode';
import { registrationSuccess } from '@/types/AuthActionTypes';
import { apiUrl } from '../API/apiConfig';



export const loginRequest = (userData: AuthUserDto) => async (dispatch: Dispatch<AuthAction>) => {
    try {
        dispatch({ type: 'LOGIN_REQUEST', payload: userData });


        const response = await axios.post(`${apiUrl}/auth/login`, userData);

        const user=jwt_decode<UserData>(response.data.token)
        const tokenData: TokenData = {
            token: response.data.token,
            user: user,
        };

        dispatch(registrationSuccess(tokenData));
    } catch (error) {

        dispatch({ type: 'LOGIN_FAILURE', payload: error.response?.data || 'Ошибка авторизации' });
    }
};


