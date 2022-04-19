
import {createStore, applyMiddleware , combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { reducerBuku } from './reducers/reducerBuku';
const reducer = combineReducers({
    authUser: authReducer,
    buku: reducerBuku
});
export const store = createStore(reducer, applyMiddleware(thunk));