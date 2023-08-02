import { GoodDeed, GoodDeedList } from "@/types/gooddeed";
import axios from "../../../node_modules/axios/index";
import { ThunkAction } from "../../../node_modules/redux-thunk/es/types";
import { Action } from "../../../node_modules/redux/index";
import createApiConfig, { apiUrl } from "../API/apiConfig";
import { RootState } from "../index";
import jwt_decode from 'jwt-decode';


type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;


export const getGoodDeeds = (): AppThunk => async (dispatch) => {
    try {

        const token = localStorage.getItem('token');


        const decodedToken: { id: number } | null = jwt_decode(token) as { id: number } | null;

        if (!decodedToken || !decodedToken.id) {
            throw new Error('Id пользователя не найден в токене.');
        }

        const userId = decodedToken.id;


        const response = await axios.get<GoodDeedList>(`${apiUrl}/gooddeeds/${userId}`, createApiConfig());
        const goodDeeds = response.data;
        dispatch({ type: 'GET_GOOD_DEEDS_SUCCESS', payload: goodDeeds });
    } catch (error) {
        dispatch({ type: 'GET_GOOD_DEEDS_FAILURE', payload: error.message });
    }
};
export const updateGoodDeedsList = (newGoodDeed: GoodDeed) => {
    return {
        type: 'UPDATE_GOOD_DEEDS_LIST',
        payload: newGoodDeed,
    };
};

export const addGoodDeed = (newGoodDeed: GoodDeed): AppThunk => async (dispatch) => {
    try {
        const response = await axios.post<GoodDeed>(`${apiUrl}/gooddeeds`, newGoodDeed, createApiConfig());
        const addedGoodDeed = response.data;
        dispatch({ type: 'ADD_GOOD_DEED_SUCCESS', payload: addedGoodDeed });
    } catch (error) {
        dispatch({ type: 'ADD_GOOD_DEED_FAILURE', payload: error.message });
    }
};


export const deleteGoodDeed = (id: number): AppThunk => async (dispatch) => {
    try {
        await axios.delete(`${apiUrl}/gooddeeds/${id}`, createApiConfig());
        dispatch({ type: 'DELETE_GOOD_DEED_SUCCESS', payload: id });
    } catch (error) {
        dispatch({ type: 'DELETE_GOOD_DEED_FAILURE', payload: error.message });
    }
};


export const updateGoodDeed = (updatedGoodDeed: GoodDeed): AppThunk => async (dispatch) => {
    try {
        const response = await axios.put<GoodDeed>(
            `${apiUrl}/gooddeeds/${updatedGoodDeed.id}`,
            updatedGoodDeed,
            createApiConfig()
        );

        const editedGoodDeed = response.data;
        dispatch({ type: 'UPDATE_GOOD_DEED_SUCCESS', payload: editedGoodDeed });
    } catch (error) {
        dispatch({ type: 'UPDATE_GOOD_DEED_FAILURE', payload: error.message });
    }
};


