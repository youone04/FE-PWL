import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

const Table = (props) => {
  const navigate = useNavigate();
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
  }, [props.offset, props.data, props.dataLength]);

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
                  <a href="#">Home</a>
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
                    onChange={(e)=> props.handleLimit(e)}
                  >
                     <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                  </select>

                  <div className="card-tools">
                    <div
                      className="input-group input-group-sm"
                      style={{ width: 150 }}
                    >
                      <input
                        onChange={(e) => props.setSearch(e.target.value)}
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
                <div className="card-body">
                  <table
                    id="example2"
                    className="table table-bordered table-hover"
                  >
                    <thead className="text-center">
                      <tr>
                        <th>No</th>
                        <th>ID Anggota</th>
                        <th>Nama Peminjam</th>
                        <th>Jenis Kelamin</th>
                        <th>Alamat</th>
                        <th>No Hp</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {currentItems.map((anggota, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + itemFirst}</td>
                            <td>{anggota.id}</td>
                            <td>{anggota.nama_peminjam}</td>
                            <td>{anggota.jk}</td>
                            <td>{anggota.alamat}</td>
                            <td>{anggota.hp}</td>
                            <td style={{ width: "25%", textAlign: "center" }}>
                              <button
                                type="button"
                                onClick={() =>
                                  navigate("/edit-anggota", {
                                    state: {
                                      id: anggota.id,
                                      nama_peminjam: anggota.nama_peminjam,
                                      jk: anggota.jk,
                                      alamat: anggota.alamat,
                                      hp: anggota.hp,
                                    },
                                  })
                                }
                                className="btn btn-success"
                              >
                                <i className="fas fa-edit"></i> edit
                              </button>
                              <button
                                onClick={() => props.handleDelete(anggota.id)}
                                type="button"
                                className="btn btn-danger ml-2"
                              >
                                <i className="fas fa-trash"></i> delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
