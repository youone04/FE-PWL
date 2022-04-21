import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { getBuku } from "../../../config/redux/actions/getBuku";
import { auth } from "../../../config/redux/actions/authAction";
import { useEffect } from "react";
import swal from "sweetalert";

const ManageBuku = () => {
  const buku = useSelector((state) => state.buku);
  const dispatch = useDispatch();
  const { data, loading, error } = buku.dataBuku;

  useEffect(() => {
    dispatch(getBuku());
    dispatch(auth());
  }, [dispatch]);

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
                // Authorization: `Bearer ${token}`,
              },
            }
          );

          const hasil = await result.json();
          console.log(hasil);
          if (hasil.status === 200) {
            dispatch(getBuku());
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
        <p>loading</p>
      ) : (
        <Table
          handleDelete={handleDelete}
          data={data.data}
          tambah="tambah-buku"
          title="Manage Buku"
        />
      )}
    </>
  );
};
export default ManageBuku;
