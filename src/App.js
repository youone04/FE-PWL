import "./App.css";
import Header from "./Components/Admin/Header";
import Menu from "./Components/Admin/Menu";
import Footer from "./Components/Admin/Footer";
import Dashboard from "./Components/Admin/Dashboard";
import Login from "./Pages/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import Table from "./Components/Admin/Table";
import ProtectedRoutes from "./config/ProtectedRoutes";
import ManageBuku from "./Pages/ManageBuku";
import TambahBuku from "./Pages/TambahBuku";
import EditBuku from "./Pages/EditBuku";
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
        </Route>
      </Routes>
      {position && <Footer />}
    </div>
  );
}

export default App;
