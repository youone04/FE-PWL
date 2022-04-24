import {Link} from 'react-router-dom'

const Menu = () => {
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
              <a href="#!" className="d-block">
                Admin
              </a>
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
                  <p>
                    Sirkulasi
                  </p>
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
                  <p>
                    Pengguna System
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <a href="pages/gallery.html" className="nav-link">
                  <i className="nav-icon far fa-image" />
                  <p>Log Out</p>
                </a>
              </li>          
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};
export default Menu;
