// UserActionTypes.ts

import { Action } from '../../node_modules/redux/index';
import { UserData, GoodDeed } from './auth';

export enum UserActionType {
    SET_USER = 'SET_USER',
    SET_USERS = 'SET_USERS',
    ADD_FRIEND_SUCCESS = 'ADD_FRIEND_SUCCESS',
    ADD_FRIEND_ERROR = 'ADD_FRIEND_ERROR',
    FETCH_FRIEND_GOOD_DEEDS_SUCCESS = 'FETCH_FRIEND_GOOD_DEEDS_SUCCESS',
    FETCH_FRIEND_GOOD_DEEDS_ERROR = 'FETCH_FRIEND_GOOD_DEEDS_ERROR',
    UPDATE_USERNAME_SUCCESS = 'UPDATE_USERNAME_SUCCESS',
    DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
    DELETE_USER_ERROR = 'DELETE_USER_ERROR',
}



export interface DeleteUserSuccessAction extends Action<UserActionType.DELETE_USER_SUCCESS> {
    payload: string; // Сообщение об успешном удалении пользователя
}

export interface DeleteUserErrorAction extends Action<UserActionType.DELETE_USER_ERROR> {
    payload: string; // Сообщение об ошибке при удалении пользователя
}

export interface SetUserAction extends Action<UserActionType.SET_USER> {
    payload: UserData;
}

export interface SetUsersAction extends Action<UserActionType.SET_USERS> {
    payload: UserData[]; // Массив объектов UserData
}

export interface AddFriendSuccessAction extends Action<UserActionType.ADD_FRIEND_SUCCESS> {
    payload: string; // Имя пользователя, который был успешно добавлен в друзья
}

export interface AddFriendErrorAction extends Action<UserActionType.ADD_FRIEND_ERROR> {
    payload: string; // Сообщение об ошибке при добавлении в друзья
}

export interface FetchFriendGoodDeedsSuccessAction extends Action<UserActionType.FETCH_FRIEND_GOOD_DEEDS_SUCCESS> {
    payload: GoodDeed[]; // Массив объектов GoodDeed
}

export interface FetchFriendGoodDeedsErrorAction extends Action<UserActionType.FETCH_FRIEND_GOOD_DEEDS_ERROR> {
    payload: string; // Сообщение об ошибке при получении добрых дел друга
}



export type UserActionTypes =
    | SetUserAction
    | SetUsersAction
    | AddFriendSuccessAction
    | AddFriendErrorAction
    | FetchFriendGoodDeedsSuccessAction
    | FetchFriendGoodDeedsErrorAction
    | DeleteUserSuccessAction
    | DeleteUserErrorAction;



export const deleteUserSuccess = (message: string): DeleteUserSuccessAction => ({
    type: UserActionType.DELETE_USER_SUCCESS,
    payload: message,
});

export const deleteUserError = (errorMessage: string): DeleteUserErrorAction => ({
    type: UserActionType.DELETE_USER_ERROR,
    payload: errorMessage,
});