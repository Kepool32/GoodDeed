import { combineReducers } from 'redux';

import authReducer from "../redusers/authReducer";
import goodDeedReducer from './goodDeedReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    goodDeed:goodDeedReducer,
    user:userReducer

});

export default rootReducer;