// src/store/actions/goodDeedsActionTypes.ts

import { GoodDeed,GoodDeedList } from "@/types/gooddeed";



export const GET_GOOD_DEEDS_SUCCESS = 'GET_GOOD_DEEDS_SUCCESS';
export const GET_GOOD_DEEDS_FAILURE = 'GET_GOOD_DEEDS_FAILURE';
export const ADD_GOOD_DEED_SUCCESS = 'ADD_GOOD_DEED_SUCCESS';
export const ADD_GOOD_DEED_FAILURE = 'ADD_GOOD_DEED_FAILURE';
export const DELETE_GOOD_DEED_SUCCESS = 'DELETE_GOOD_DEED_SUCCESS';
export const DELETE_GOOD_DEED_FAILURE = 'DELETE_GOOD_DEED_FAILURE';
export const UPDATE_GOOD_DEED_SUCCESS = 'UPDATE_GOOD_DEED_SUCCESS';
export const UPDATE_GOOD_DEED_FAILURE = 'UPDATE_GOOD_DEED_FAILURE';



export enum GoodDeedActionType {
    GET_GOOD_DEEDS_SUCCESS = 'GET_GOOD_DEEDS_SUCCESS',
    GET_GOOD_DEEDS_FAILURE = 'GET_GOOD_DEEDS_FAILURE',
    ADD_GOOD_DEED_SUCCESS = 'ADD_GOOD_DEED_SUCCESS',
    ADD_GOOD_DEED_FAILURE = 'ADD_GOOD_DEED_FAILURE',
    DELETE_GOOD_DEED_SUCCESS = 'DELETE_GOOD_DEED_SUCCESS',
    DELETE_GOOD_DEED_FAILURE = 'DELETE_GOOD_DEED_FAILURE',
    UPDATE_GOOD_DEED_SUCCESS = 'UPDATE_GOOD_DEED_SUCCESS',
    UPDATE_GOOD_DEED_FAILURE = 'UPDATE_GOOD_DEED_FAILURE',
}

interface GetGoodDeedsSuccessAction {
    type: typeof GET_GOOD_DEEDS_SUCCESS;
    payload: GoodDeedList;
}

interface GetGoodDeedsFailureAction {
    type: typeof GET_GOOD_DEEDS_FAILURE;
    payload: string; // Сообщение об ошибке
}

interface AddGoodDeedSuccessAction {
    type: typeof ADD_GOOD_DEED_SUCCESS;
    payload: GoodDeed;
}

interface AddGoodDeedFailureAction {
    type: typeof ADD_GOOD_DEED_FAILURE;
    payload: string; // Сообщение об ошибке
}

interface DeleteGoodDeedSuccessAction {
    type: typeof DELETE_GOOD_DEED_SUCCESS;
    payload: string; // ID удаленного хорошего дела
}

interface DeleteGoodDeedFailureAction {
    type: typeof DELETE_GOOD_DEED_FAILURE;
    payload: string; // Сообщение об ошибке
}

interface UpdateGoodDeedSuccessAction {
    type: typeof UPDATE_GOOD_DEED_SUCCESS;
    payload: GoodDeed;
}

interface UpdateGoodDeedFailureAction {
    type: typeof UPDATE_GOOD_DEED_FAILURE;
    payload: string; // Сообщение об ошибке
}

export type GoodDeedsActionTypes =
    | GetGoodDeedsSuccessAction
    | GetGoodDeedsFailureAction
    | AddGoodDeedSuccessAction
    | AddGoodDeedFailureAction
    | DeleteGoodDeedSuccessAction
    | DeleteGoodDeedFailureAction
    | UpdateGoodDeedSuccessAction
    | UpdateGoodDeedFailureAction;
