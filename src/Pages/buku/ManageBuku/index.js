import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { getBuku } from "../../../config/redux/actions/getBuku";
import { auth } from "../../../config/redux/actions/authAction";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const ManageBuku = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [remountComponent, setRemountComponent] = useState(0);

  const buku = useSelector((state) => state.buku);
  const dispatch = useDispatch();
  const { data, loading, error } = buku.dataBuku;

  useEffect(() => {
    dispatch(getBuku(search, offset, limit));
    dispatch(auth());
  }, [dispatch, search, offset, limit]);

  const handleDelete = (id) => {
    swal({
      title: "Apakah Kamu Yakin?",
      text: "Data buku akan dihapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const result = await fetch(
            `${process.env.REACT_APP_API}/api/buku/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const hasil = await result.json();
          if (hasil.status === 200) {
            dispatch(getBuku(search, offset, limit));
            swal("Success", hasil.message, "success");
          } else {
            swal("Failed", hasil.message, "error");
          }
        } catch (error) {
          swal(
            "Failed",
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
            "error"
          );
        }
      }
    });
  };
  const handleLimit = (e) => {
    e.preventDefault();
    setRemountComponent(Math.random());
    setLimit(e.target.value);
    setOffset(0);
  };

  return (
    <>
      {loading ? (
        <center>
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </center>
      ) : error ? (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      ) : (
        <Table
          tambah="tambah-buku"
          title="Manage Buku"
          
          handleDelete={handleDelete}
          data={data.data}
          dataLength={data.count}
          limit={limit}
          setOffset={setOffset}
          offset={offset}
          remountComponent={remountComponent}
          setSearch={setSearch}
          handleLimit={handleLimit}
        />
      )}
    </>
  );
};
export default ManageBuku;
