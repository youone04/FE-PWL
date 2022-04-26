import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

const Menu = () => {
  const [username , setUserName] = useState('none');
  useEffect(() => {

    try{
      const data = localStorage.getItem('token');
      const decoded = jwt_decode(data);
      setUserName(decoded.username);
    }catch(error){
      alert(error)
    }

  },[])
  
  const Navigate = useNavigate();
  const handleLogout = () => {
    swal({
      title: "Apakah kamu yakin",
      text: "Anda akan logout",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("token");
        Navigate("/");
      }
    });
  };

  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User"
              />
            </div>
            <div className="info">
              <Link to="/dashboard" className="d-block">
                {username}
              </Link>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link active">
                      <p>Dashboard</p>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a href="#!" className="nav-link">
                  <i className="nav-icon fas fa-chart-pie" />
                  <p>
                    Kelola Data
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/manage-buku" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Buku</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/manage-anggota" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Anggota</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/manage-transaksi" className="nav-link">
                  <i className="nav-icon fas fa-tree" />
                  <p>Sirkulasi</p>
                </Link>
              </li>
              <li className="nav-item">
                <a href="#!" className="nav-link">
                  <i className="nav-icon fas fa-edit" />
                  <p>
                    Log Data
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/log-peminjaman" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Log Peminjaman</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/log-pengembalian" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Log Pengembalian</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#!!" className="nav-link">
                  <i className="nav-icon fas fa-table" />
                  <p>
                    Laporan
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="pages/tables/simple.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Simple Tables</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/tables/data.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>DataTables</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="pages/tables/jsgrid.html" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>jsGrid</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-header">Lainnya</li>
              <li className="nav-item">
                <Link to="/pengguna" className="nav-link">
                  <i className="nav-icon far fa-calendar-alt" />
                  <p>Pengguna System</p>
                </Link>
              </li>
              <li className="nav-item">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                  className="nav-link text-white"
                >
                  <i className="nav-icon far fa-user" />
                  <p>Log Out</p>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};
export default Menu;
