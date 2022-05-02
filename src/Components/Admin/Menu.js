import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
const Menu = () => {
  const [username, setUserName] = useState("none");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem("token");
      const decoded = jwt_decode(data);
      setUserName(decoded.username);
    } catch (error) {
      alert(error);
    }
  }, []);

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
      <aside className="main-sidebar elevation-4" style={{backgroundColor:'#00588A'}}>
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
              <Link style={{color:'white',textDecoration:'none'}} to="/dashboard" className="d-block">
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
                      <p style={{color:'white'}}>Dashboard</p>
                    </Link>
                  </li>
                </ul>
              </li>

             
                 {/* <a  onClick={() => setOpen(!open)} href="#" className="nav-link">
                  <i className="nav-icon fas fa-chart-pie mr-2" />
                  <p>
                    Kelola Data
                    <i className="right fas fa-angle-left"/>
                  </p>
                </a>
                
              <Collapse in={open}>
                <ul className="nav nav-treeviews">
                  <li className="nav-item">
                    <Link to="/manage-buku" className="nav-link">
                      <i className="far fa-circle nav-icon mr-1" />
                      <p>Buku</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/manage-anggota" className="nav-link">
                      <i className="far fa-circle nav-icon mr-1" />
                      <p>Anggota</p>
                    </Link>
                  </li>
                </ul>
              </Collapse> */}

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i style={{color:'white'}} className="nav-icon fas fa-chart-pie" />
                  <p style={{color:'white'}}>
                    Kelola Data
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li style={{color:'white'}} className="nav-item">
                    <Link style={{color:'white'}} to="/manage-buku" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Buku</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link style={{color:'white'}} to="/manage-anggota" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Anggota</p>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/manage-transaksi" className="nav-link">
                  <i style={{color:'white'}} className="nav-icon fas fa-tree" />
                  <p style={{color:'white'}}>Sirkulasi</p>
                </Link>
              </li>
              <li className="nav-item">
                <a style={{color:'white'}} href="#!" className="nav-link">
                  <i className="nav-icon fas fa-edit" />
                  <p>
                    Log Data
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/log-peminjaman" className="nav-link">
                      <i style={{color:'white'}} className="far fa-circle nav-icon" />
                      <p style={{color:'white'}}>Log Peminjaman</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/log-pengembalian" className="nav-link">
                      <i style={{color:'white'}} className="far fa-circle nav-icon" />
                      <p style={{color:'white'}}>Log Pengembalian</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#!!" className="nav-link">
                  <i style={{color:'white'}} className="nav-icon fas fa-table" />
                  <p style={{color:'white'}}>
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
              <li className="nav-header" style={{color:'white'}}>Lainnya</li>
              <li className="nav-item">
                <Link to="/pengguna" className="nav-link">
                  <i style={{color:'white'}} className="nav-icon far fa-calendar-alt" />
                  <p style={{color:'white'}}>Pengguna System</p>
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
