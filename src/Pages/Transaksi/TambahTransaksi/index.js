import { useSelector, useDispatch } from "react-redux";
import { getTransaksi } from "../../../config/redux/actions/getTransaksi";
import { auth } from "../../../config/redux/actions/authAction";
import { useEffect } from "react";
import DataTransaksi from "./DataTransaksi";
import { getBuku } from "../../../config/redux/actions/getBuku";
import { getPeminjam } from "../../../config/redux/actions/getAnggota";



const TambahTransaksi = () => {
  const transaksi = useSelector((state) => state.transaksi);
  const buku = useSelector((state) => state.buku);
  const anggota = useSelector((state) => state.anggota);
  const dispatch = useDispatch();
  const { data , loading, error } = transaksi.dataTransaksi;
  const { data : dataBuku , loading : loadingBuku, error: errorBuku } = buku.dataBuku;
  const { data : dataAnggota , loading : loadingAnggota, error: errorAnggota } = anggota.dataAnggota;

  useEffect(() => {
    dispatch(getTransaksi());
    dispatch(getBuku());
    dispatch(getPeminjam());
    dispatch(auth());
  }, [dispatch]);

  console.log(data.count)


  return (
    <>
      {loading || loadingBuku || loadingAnggota ? (
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error || errorBuku || errorAnggota ? (
        <div className="alert alert-danger" role="alert">
          {error || errorBuku || errorAnggota}
        </div>
      ) : (
        <DataTransaksi 
        data={data.data}
        count={data.count.count}
        dataBuku={dataBuku.data}
        dataAnggota={dataAnggota.data}
         />
      )}
    </>
  );
};
export default TambahTransaksi;
