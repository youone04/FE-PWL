
import {createStore, applyMiddleware , combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { reducerBuku } from './reducers/reducerBuku';
import { reducerAnggota } from './reducers/reducerAnggota';

const reducer = combineReducers({
    authUser: authReducer,
    buku: reducerBuku,
    anggota: reducerAnggota
});

export const store = createStore(reducer, applyMiddleware(thunk));