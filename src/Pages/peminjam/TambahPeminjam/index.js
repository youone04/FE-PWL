import FormTambahAnggota from "./FormTambahAnggota";
import { useSelector, useDispatch } from "react-redux";
import { getPeminjam } from "../../../config/redux/actions/getAnggota";
import { auth } from "../../../config/redux/actions/authAction";
import { useEffect } from "react";

const TambahPeminjam = () => {
  const anggota = useSelector((state) => state.anggota);
  const dispatch = useDispatch();
  const { data, loading, error } = anggota.dataAnggota;

  useEffect(() => {
    dispatch(getPeminjam());
    dispatch(auth());
  }, [dispatch]);


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
        <FormTambahAnggota data={data.data} />
      )}
    </>
  );
};
export default TambahPeminjam;
