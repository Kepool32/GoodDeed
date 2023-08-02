import { UserData } from '@/types/auth';
import {
    UserActionTypes,
    UserActionType,
    SetUsersAction,
    AddFriendSuccessAction,
    AddFriendErrorAction,
    FetchFriendGoodDeedsSuccessAction,
    FetchFriendGoodDeedsErrorAction,
} from '@/types/UserActionTypes';

interface AuthState {
    user: UserData | null;
    allUsers: UserData[];
    friends: string[];
    error: string | null;
    friendGoodDeeds: any[];
}

const initialState: AuthState = {
    user: null,
    allUsers: [],
    friends: [],
    error: null,
    friendGoodDeeds: [],
};

const userReducer = (state = initialState, action: UserActionTypes): AuthState => {
    switch (action.type) {
        case UserActionType.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case UserActionType.SET_USERS:
            return {
                ...state,
                allUsers: action.payload,
            };
        case UserActionType.ADD_FRIEND_SUCCESS:
            return {
                ...state,
                friends: [...state.friends, action.payload],
                error: null,
            };
        case UserActionType.ADD_FRIEND_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case UserActionType.FETCH_FRIEND_GOOD_DEEDS_SUCCESS:
            return {
                ...state,
                friendGoodDeeds: action.payload,
                error: null,
            };
        case UserActionType.FETCH_FRIEND_GOOD_DEEDS_ERROR:
            return {
                ...state,
                error: action.payload,
            };


        default:
            return state;
    }
};

export default userReducer;
