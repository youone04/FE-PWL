import { useSelector, useDispatch } from "react-redux";
import { getDashboard } from "../../config/redux/actions/getDashboard";
import { auth } from "../../config/redux/actions/authAction";
import { getLogPengembalian } from "../../config/redux/actions/getLogPengembalian";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const numberWithCommas = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const Dashboard = () => {
  const dashboard = useSelector((state) => state.dashboard);
  const log_pengembalian = useSelector((state) => state.log_pengembalian);
  const dispatch = useDispatch();
  const { data, loading, error } = dashboard.dataDashboard;
  const { data:dataKembali, loading: loadingKembali, error:errorKembali } = log_pengembalian.dataLogPengembalian;


  useEffect(() => {
    dispatch(getDashboard());
    dispatch(getLogPengembalian());
    dispatch(auth());
  }, [dispatch]);

  return (
    <div className="content-wrapper">
      {loading || loadingKembali ? (
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error || errorKembali ? (
        <div className="alert alert-danger" role="alert">
          {error || errorKembali}
        </div>
      ) : (
        <>
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Dashboard</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#!">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{data.data.buku}</h3>
                      <p>Buku</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag" />
                    </div>
                    <Link to="/manage-buku" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>
                       Rp.{dataKembali.total_denda?numberWithCommas(dataKembali.total_denda):0}
                      </h3>
                      <p>Total Denda</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-stats-bars" />
                    </div>
                    <Link to="/log-pengembalian" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{data.data.anggota}</h3>
                      <p>Anggota</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                    <Link to="/manage-anggota" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>{data.data.user}</h3>
                      <p>Admin</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-pie-graph" />
                    </div>
                    <Link to="/pengguna" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
export default Dashboard;
