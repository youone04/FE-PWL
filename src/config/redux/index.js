import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { reducerBuku } from "./reducers/reducerBuku";
import { reducerAnggota } from "./reducers/reducerAnggota";
import { reducerTransaksi } from "./reducers/reducerTransaksi";
import { reducerLogPeminjaman } from "./reducers/reduceLogPeminjaman";
import { reducerLogPengembalian } from "./reducers/reducerPengembalian";
import { reducerDashboard } from "./reducers/reducerDashboard";
import { reducerAdmin } from "./reducers/reducerAdmin";

const reducer = combineReducers({
  authUser: authReducer,
  buku: reducerBuku,
  anggota: reducerAnggota,
  transaksi: reducerTransaksi,
  log_pinjam: reducerLogPeminjaman,
  log_pengembalian: reducerLogPengembalian,
  dashboard : reducerDashboard,
  admin: reducerAdmin
});

export const store = createStore(reducer, applyMiddleware(thunk));
