import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/id";

const Table = (props) => {
  const navigate = useNavigate();

  let dateNow = new Date().getTime();
  const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>{props.title}</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#!!">Home</a>
                </li>
                <li className="breadcrumb-item active">{props.title}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <button
                onClick={() => navigate(`/${props.tambah}`)}
                className="btn btn-primary mb-3"
              >
                + TAMBAH
              </button>
              <div className="card">
                <div className="card-header">
                  {/* <button className="btn btn-primary mb-3">+ TAMBAH</button> */}
                  <select
                    className="form-control col-lg-2"
                    style={{ display: "inline-block" }}
                    id="exampleFormControlSelect1"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>

                  <div className="card-tools">
                    <div
                      className="input-group input-group-sm"
                      style={{ width: 150 }}
                    >
                      <input
                        type="text"
                        name="table_search"
                        className="form-control float-right"
                        placeholder="Search"
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-default">
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body table-responsive">
                  <table
                    id="example2"
                    className="table table-bordered table-hover"
                  >
                    <thead className="text-center">
                      <tr>
                        <th>No</th>
                        <th>ID Admin</th>
                        <th>Nama</th>
                        <th>Role</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {props.data.map((admin, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{admin.id}</td>
                            <td>{admin.username}</td>
                            <td>{'admin'}</td>
                            <td style={{ width: "33%", textAlign: "center" }}>
                              <button
                                className="btn btn-success"
                                type="button"
                                onClick={() => props.handlePerpanjang(admin.id,admin.start ,admin.end,admin.jumlah_perpanjang)}
                              >
                             <i className="fa fa-circle"></i>
                              </button>
                              <button
                                onClick={() => props.handlePengembalian(admin.id , admin.end)}
                                type="button"
                                className="btn btn-danger ml-2"
                              >
                                <i className="fa fa-circle"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Table;