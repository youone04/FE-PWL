import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { getTransaksi } from "../../../config/redux/actions/getTransaksi";
import { auth } from "../../../config/redux/actions/authAction";
import { useEffect } from "react";
import swal from "sweetalert";

const ManageTransaksi = () => {
  const transaksi = useSelector((state) => state.transaksi);
  const dispatch = useDispatch();
  const { data, loading, error } = transaksi.dataTransaksi;

  useEffect(() => {
    dispatch(getTransaksi());
    dispatch(auth());
  }, [dispatch]);

  const handlePengembalian = (id, end) => {
    let dateNow = new Date().getTime();
    let masa = Math.ceil(
      (new Date(`${end}`).getTime() - dateNow) / (1000 * 3600 * 24)
    );
    let denda = 0;
    if (masa < 0) {
      denda =
        Math.abs(
          Math.ceil(
            (new Date(`${end}`).getTime() - dateNow) / (1000 * 3600 * 24)
          )
        ) * 1000;
    }
    const dataSend = {
      pengembalian: true,
      denda: denda,
    };

    swal({
      title: "Apakah Kamu Yakin?",
      text: "Pastikan Peminjam Sudah Membayar Denda Jika Terdapat Denda",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const result = await fetch(
            `${process.env.REACT_APP_API}/api/transaksi/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(dataSend),
            }
          );

          const hasil = await result.json();
          console.log(hasil);
          if (hasil.status === 200) {
            dispatch(getTransaksi());
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

  const handlePerpanjang = (id,start , end, jumlahPerpanjang) => {
    const dateStart = new Date(start)
    dateStart.setTime(dateStart.getTime() + (3 * 24 * 60 * 60 * 1000));

    const dateEnd = new Date(end)
    dateEnd.setTime(dateEnd.getTime() + (3 * 24 * 60 * 60 * 1000));

    const dataSend = {
      start: dateStart,
      end: dateEnd,
    };
    let dateNow = new Date().getTime();
    let masa = Math.ceil(
      (new Date(`${end}`).getTime() - dateNow) / (1000 * 3600 * 24)
    );
    if (masa < 0) {
      swal("Failed", "Anda Tidak dapat perpanjang, silahkan bayar denda", "warning");
      return
    }
    if(jumlahPerpanjang > 2){
      swal("Failed", " Limit Batas Perpanjangan 3X", "warning");
      return
    }

    swal({
      title: "Apakah Kamu Yakin?",
      text: "Petpanjang Otomatis 3 Hari",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const result = await fetch(
            `${process.env.REACT_APP_API}/api/perpanjang/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(dataSend),
            }
          );

          const hasil = await result.json();
          console.log(hasil);
          if (hasil.status === 200) {
            dispatch(getTransaksi());
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
          tambah="tambah-transaksi"
          title="Manage Tranaksi"
          handlePengembalian={handlePengembalian}
          handlePerpanjang={handlePerpanjang}
        />
      )}
    </>
  );
};
export default ManageTransaksi;
