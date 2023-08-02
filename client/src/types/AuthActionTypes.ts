// authActionTypes.ts

import {AuthAction, CreateUserDto, TokenData } from "./auth";

export enum AuthActionType {
    REGISTRATION_REQUEST = 'REGISTRATION_REQUEST',
    REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
    REGISTRATION_FAILURE = 'REGISTRATION_FAILURE',
    LOGOUT = 'LOGOUT',
}

export interface RegistrationRequestAction {
    type: AuthActionType.REGISTRATION_REQUEST;
    payload: CreateUserDto;
}

export interface RegistrationSuccessAction {
    type: AuthActionType.REGISTRATION_SUCCESS;
    payload: TokenData;
}

export interface RegistrationFailureAction {
    type: AuthActionType.REGISTRATION_FAILURE;
    payload: string;
}

export interface LogoutAction {
    type: AuthActionType.LOGOUT;
}

export type AuthActionTypes =
    | RegistrationRequestAction
    | RegistrationSuccessAction
    | RegistrationFailureAction
    | LogoutAction;



