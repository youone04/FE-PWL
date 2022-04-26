import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { getPeminjam } from "../../../config/redux/actions/getAnggota";
import { auth } from "../../../config/redux/actions/authAction";
import { useEffect ,useState} from "react";
import swal from "sweetalert";

const ManagePeminjam = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [remountComponent, setRemountComponent] = useState(0);

  const anggota = useSelector((state) => state.anggota);
  const dispatch = useDispatch();
  const { data, loading, error } = anggota.dataAnggota;

  useEffect(() => {
    dispatch(getPeminjam(search, offset, limit));
    dispatch(auth());
  }, [dispatch,search, offset, limit]);

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
            dispatch(getPeminjam(search, offset, limit));
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
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <Table
          tambah="tambah-anggota"
          title="Manage Anggota"

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
export default ManagePeminjam;
