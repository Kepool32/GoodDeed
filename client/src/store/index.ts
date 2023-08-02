import thunk from '../../node_modules/redux-thunk/es/index';
import { applyMiddleware, createStore } from 'redux';

import rootReducer from './redusers/rootReducer';


// Создайте тип для нашего состояния
export type RootState = ReturnType<typeof rootReducer>;

// Примените middleware и создайте store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;




