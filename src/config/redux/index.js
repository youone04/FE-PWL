
import {createStore, applyMiddleware , combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { reducerBuku } from './reducers/reducerBuku';
import { reducerAnggota } from './reducers/reducerAnggota';
import { reducerTransaksi } from './reducers/reducerTransaksi';

const reducer = combineReducers({
    authUser: authReducer,
    buku: reducerBuku,
    anggota: reducerAnggota,
    transaksi: reducerTransaksi
});

export const store = createStore(reducer, applyMiddleware(thunk));