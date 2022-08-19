import {combineReducers, configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { feedReducer, paperReducer } from './reducers/feed.reducer';


const middleware = [thunk];
const reducer = combineReducers({
    feed:feedReducer,
    paper:paperReducer
});

const store = configureStore({reducer,middleware});

export default store;