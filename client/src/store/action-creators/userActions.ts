import {GoodDeed, UserData } from "@/types/auth";
import {deleteUserError, deleteUserSuccess, FetchFriendGoodDeedsErrorAction, FetchFriendGoodDeedsSuccessAction, SetUserAction, SetUsersAction,
     UserActionType, UserActionTypes } from "@/types/UserActionTypes";
import axios from "../../../node_modules/axios/index";
import { ThunkAction, ThunkDispatch } from "../../../node_modules/redux-thunk/es/types";
import createApiConfig, { apiUrl } from "../API/apiConfig";
import { RootState } from "../index";

export const setUser = (user: UserData): SetUserAction => ({
    type: UserActionType.SET_USER,
    payload: user,
});

export const setAllUsers = (users: UserData[]): SetUsersAction => ({
    type: UserActionType.SET_USERS,
    payload: users,
});

export const fetchFriendGoodDeedsSuccess = (goodDeeds: GoodDeed[]): FetchFriendGoodDeedsSuccessAction => ({
    type: UserActionType.FETCH_FRIEND_GOOD_DEEDS_SUCCESS,
    payload: goodDeeds,
});

export const fetchFriendGoodDeedsError = (errorMessage: string): FetchFriendGoodDeedsErrorAction => ({
    type: UserActionType.FETCH_FRIEND_GOOD_DEEDS_ERROR,
    payload: errorMessage,
});


export const fetchUserData = (): ThunkAction<void, RootState, unknown, SetUserAction> => {
    return async (dispatch: ThunkDispatch<RootState, unknown, SetUserAction>) => {
        try {
            const response = await axios.get<UserData>(`${apiUrl}/users/profile`, createApiConfig());
            const userData = response.data;


            dispatch(setUser(userData));
        } catch (error) {

        }
    };
};

export const fetchAllUsers = (): ThunkAction<void, RootState, unknown, UserActionTypes> => {
    return async (dispatch: ThunkDispatch<RootState, unknown, UserActionTypes>) => {
        try {
            const response = await axios.get<UserData[]>(`${apiUrl}/users/check`,createApiConfig());
            const usersData = response.data;

            dispatch(setAllUsers(usersData));
        } catch (error) {

        }
    };
};


export const addUserToFriends = (nameId: string): ThunkAction<void, RootState, unknown, UserActionTypes> => {
    return async (dispatch: ThunkDispatch<RootState, unknown, UserActionTypes>) => {
        try {

            await axios.post(`${apiUrl}/friends/add`, { nameId2: nameId },createApiConfig());


            dispatch({ type: UserActionType.ADD_FRIEND_SUCCESS, payload: nameId });

        } catch (error) {

            dispatch({ type: UserActionType.ADD_FRIEND_ERROR, payload: error.message });
        }
    };
};
export const fetchFriendGoodDeeds = (friendId: number): ThunkAction<void, RootState, unknown, UserActionTypes> => {
    return async (dispatch: ThunkDispatch<RootState, unknown, UserActionTypes>) => {
        try {
            const response = await axios.get<GoodDeed[]>(`${apiUrl}/gooddeeds/${friendId}`, createApiConfig());
            const friendGoodDeeds = response.data;
            dispatch(fetchFriendGoodDeedsSuccess(friendGoodDeeds));
        } catch (error) {
            dispatch(fetchFriendGoodDeedsError(error.message || 'Failed to fetch friend\'s good deeds'));
        }
    };
};

export const deleteUser = (): ThunkAction<void, RootState, unknown, UserActionTypes> => {
    return async (dispatch: ThunkDispatch<RootState, unknown, UserActionTypes>) => {

            await axios.delete(`${apiUrl}/users/del`, createApiConfig());

    };
};




