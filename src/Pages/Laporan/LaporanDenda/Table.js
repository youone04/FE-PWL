import moment from "moment";
import "moment/locale/id";import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import DownloadLaporan from "./DownloadLaporan";

const numberWithCommas = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const Table = (props) => {

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemFirst, setItemFirst] = useState(0);

  useEffect(() => {
    const setPagination = () => {
      setItemFirst(props.offset + 1);
      setCurrentItems(props.data);
      setPageCount(Math.ceil(props.dataLength / props.limit));
    };
    setPagination();
  }, [props.offset, props.data, props.dataLength,props.limit]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * props.limit) % props.dataLength;
    props.setOffset(newOffset || 0);
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    scrollToTop();
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
              
              <div className="card">
                <div className="card-header">
                  <select
                    className="form-control col-lg-2"
                    style={{ display: "inline-block" }}
                    id="exampleFormControlSelect1"
                    onChange={(e)=> props.handleLimit(e)}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                  </select>

                  <div className="card-tools col-sm-12 col-lg-3 mt-2">
                    <div
                      className="input-group input-group-sm"
                      style={{ width: '100%' }}
                    >
                      <input value={props.month} onChange={(e) => props.handleChangeMonth(e.target.value)} type="month" className="form-control" id="month" placeholder="month"/>
                      <button className="btn btn-success ml-1" onClick={() => DownloadLaporan(props.offset , props.limit, props.month)}>Download</button>
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
                        <th>Denda</th>
                        <th>Tanggal Pengembalian</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {currentItems.map((transaksi, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + itemFirst}</td>
                            <td>{transaksi.id}</td>
                            <td>{transaksi.nama_peminjam}</td>
                            <td>{transaksi.nama_buku}</td>
                            <td>{numberWithCommas(transaksi.denda)}</td>
                            <td>{moment(transaksi.updated_at).format("LL")}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <p>Jumlah Denda : Rp.{numberWithCommas(props.denda)} </p>
                  <div key={props.remountComponent}>
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel={"Selanjutnya >"}
                      onPageChange={handlePageClick}
                      initialPage={0}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel={"< Sebelumnya"}
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                      renderOnZeroPageCount={null}
                    />
                  </div>
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
