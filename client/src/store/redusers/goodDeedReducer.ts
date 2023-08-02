import { GoodDeed,GoodDeedsState } from "@/types/gooddeed";
import {GoodDeedActionType, GoodDeedsActionTypes } from "@/types/goodDeedsActionTypes";



const initialState: GoodDeedsState = {
    goodDeeds: [],
    loading: false,
    error: null,
};

const goodDeedsReducer = (state = initialState, action: GoodDeedsActionTypes): GoodDeedsState => {
    switch (action.type) {
        case GoodDeedActionType.GET_GOOD_DEEDS_SUCCESS:
            return {
                ...state,
                goodDeeds: action.payload,
                loading: false,
                error: null,
            };
        case GoodDeedActionType.GET_GOOD_DEEDS_FAILURE:
            return {
                ...state,
                goodDeeds: [],
                loading: false,
                error: action.payload,
            };
        case GoodDeedActionType.ADD_GOOD_DEED_SUCCESS:
            return {
                ...state,
                goodDeeds: [...state.goodDeeds, action.payload],
                loading: false,
                error: null,
            };
        case GoodDeedActionType.ADD_GOOD_DEED_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GoodDeedActionType.DELETE_GOOD_DEED_SUCCESS:
            return {
                ...state,
                goodDeeds: state.goodDeeds.filter((goodDeed: GoodDeed) => goodDeed.id !== action.payload),
                loading: false,
                error: null,
            };
        case GoodDeedActionType.DELETE_GOOD_DEED_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GoodDeedActionType.UPDATE_GOOD_DEED_SUCCESS:
            return {
                ...state,
                goodDeeds: state.goodDeeds.map((goodDeed: GoodDeed) =>
                    goodDeed.id === action.payload.id ? action.payload : goodDeed
                ),
                loading: false,
                error: null,
            };
        case GoodDeedActionType.UPDATE_GOOD_DEED_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default goodDeedsReducer;
