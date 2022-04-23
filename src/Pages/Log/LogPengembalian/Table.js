import moment from "moment";
import "moment/locale/id";

const Table = (props) => {
  var dateNow = new Date().getTime();
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
              {/* <button
                onClick={() => navigate(`/${props.tambah}`)}
                className="btn btn-primary mb-3"
              >
                + TAMBAH
              </button> */}
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
                        <th>ID Transaksi</th>
                        <th>Nama Peminjam</th>
                        <th>Nama Buku</th>
                        {/* <th>Tanggal Peminjaman</th> */}
                        <th>Tanggal Pengembalian</th>
                        <th>Denda (1000/hari)</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {props.data.map((transaksi, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{transaksi.id}</td>
                            <td>{transaksi.nama_peminjam}</td>
                            <td>{transaksi.nama_buku}</td>
                            {/* <td>{moment(transaksi.start).format("LL")}</td> */}
                            <td>{moment(transaksi.updated_at).format("LL")}</td>
                            <td style={{ width: "25%" }}>
                              {
                                // dateNow
                                Math.ceil(
                                  (new Date(`${transaksi.end}`).getTime() -
                                    dateNow) /
                                    (1000 * 3600 * 24)
                                ) < 0 ? (
                                  <>
                                    <span className="bg-danger p-1 rounded font-italic">
                                      Terlambat :{" "}
                                      {`${Math.abs(
                                        Math.ceil(
                                          (new Date(
                                            `${transaksi.end}`
                                          ).getTime() -
                                            dateNow) /
                                            (1000 * 3600 * 24)
                                        )
                                      )} Hari`}
                                    </span>
                                    <p className="text-danger font-italic">
                                      Denda Rp.{" "}
                                      {numberWithCommas(Math.abs(
                                        Math.ceil(
                                          (new Date(
                                            `${transaksi.end}`
                                          ).getTime() -
                                            dateNow) /
                                            (1000 * 3600 * 24)
                                        ) * 1000)
                                      )}
                                    </p>
                                  </>
                                ) : (
                                  <span className="bg-success rounded p-1">masa pinjam</span>
                                )
                              }
                            </td>
                            <td>{transaksi.jumlah_perpanjang}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <span style={{margin: 15,marginLeft: 25,fontWeight:'bold'}}> Total Denda : Rp. {numberWithCommas(props.denda)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Table;
