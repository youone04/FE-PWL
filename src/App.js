import "./App.css";
import Header from "./Components/Admin/Header";
import Menu from "./Components/Admin/Menu";
import Footer from "./Components/Admin/Footer";
import Dashboard from "./Components/Admin/Dashboard";
import Login from "./Pages/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import Table from "./Components/Admin/Table";
import ProtectedRoutes from "./config/ProtectedRoutes";
import ManageBuku from "./Pages/buku/ManageBuku";
import TambahBuku from "./Pages/buku/TambahBuku";
import EditBuku from "./Pages/buku/EditBuku";
import ManagePeminjam from "./Pages/peminjam/ManagePeminjam";
import TambahPeminjam from "./Pages/peminjam/TambahPeminjam";
import EditDataPeminjam from "./Pages/peminjam/EditPeminjam";
import ManageTransaksi from "./Pages/Transaksi/ManageTransaksi";
import TambahTransaksi from "./Pages/Transaksi/TambahTransaksi";
import LogPeminjaman from "./Pages/Log/LogPeminjaman";
import LogPengembalian from "./Pages/Log/LogPengembalian";
function App() {
  const location = useLocation();
  const position = location.pathname !== "/";

  return (
    <div className="wrapper">
      {position && <Header />}
      {position && <Menu />}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route
            exact
            path="/table"
            element={<Table title={"Manage User"} />}
          />
          <Route exact path="/manage-buku" element={<ManageBuku />} />
          <Route exact path="/tambah-buku" element={<TambahBuku />} />
          <Route exact path="/edit-buku" element={<EditBuku />} />

          <Route exact path="/manage-anggota" element={<ManagePeminjam />} />
          <Route exact path="/tambah-anggota" element={<TambahPeminjam />} />
          <Route exact path="/edit-anggota" element={<EditDataPeminjam />} />

          <Route exact path="/manage-transaksi" element={<ManageTransaksi />} />
          <Route exact path="/tambah-transaksi" element={<TambahTransaksi />} />

          <Route exact path="/log-peminjaman" element={<LogPeminjaman />} />
          <Route exact path="/log-pengembalian" element={<LogPengembalian />} />
        </Route>
      </Routes>
      {position && <Footer />}
    </div>
  );
}

export default App;
