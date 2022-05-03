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
    dispatch(getTransaksi("",0,data?.data?.length));
    dispatch(getBuku("",0,dataBuku?.data?.length));
    dispatch(getPeminjam("",0,dataAnggota?.data?.length));
    dispatch(auth());
  }, [dispatch,data?.data?.length,dataBuku?.data?.length,dataAnggota?.data?.length]);
  
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
        count={data.lengthAll.count}
        dataBuku={dataBuku.data}
        dataAnggota={dataAnggota.data}
         />
      )}
    </>
  );
};
export default TambahTransaksi;
