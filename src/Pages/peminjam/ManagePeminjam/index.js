import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { getPeminjam } from "../../../config/redux/actions/getAnggota";
import { auth } from "../../../config/redux/actions/authAction";
import { useEffect } from "react";
import swal from "sweetalert";

const ManagePeminjam = () => {
  const anggota = useSelector((state) => state.anggota);
  const dispatch = useDispatch();
  const { data, loading, error } = anggota.dataAnggota;

  useEffect(() => {
    dispatch(getPeminjam());
    dispatch(auth());
  }, [dispatch]);

  const handleDelete = async (id) => {
    swal({
      title: "Apakah Kamu Yakin?",
      text: "Data peminjam akan dihapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const result = await fetch(
            `${process.env.REACT_APP_API}/api/peminjam/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
              },
            }
          );

          const hasil = await result.json();
          if (hasil.status === 200) {
            dispatch(getPeminjam());
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

  return (
    <>
      {loading ? (
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <Table
          data={data.data}
          tambah="tambah-anggota"
          title="Manage Anggota"
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};
export default ManagePeminjam;
