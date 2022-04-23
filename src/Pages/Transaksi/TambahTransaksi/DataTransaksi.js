import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const DataTransaksi = (props) => {
  function generateID(number) {
    if (number?.toString().length === 2) {
      return `T00${parseInt(number) + 1}`;
    } else if (number?.toString().length === 3) {
      return `T0${parseInt(number) + 1}`;
    } else if (number?.toString().length === 4) {
      return `T${parseInt(number) + 1}`;
    }
    return `T000${parseInt(number) + 1}`;
  }
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const admin_id = decoded.id;
      const id = generateID(props.count);
      var date1 = new Date(`${data.end}`);
      var date2 = new Date(`${data.start}`);
      var Difference_In_Time = date1.getTime() - date2.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
     
      if(Difference_In_Days > 7){
        swal('Peringatan','Maksimal Peminjaman 7 Hari','warning');
        return;
      }else if(Difference_In_Days < 3){
        swal('Peringatan','Minimal Peminjaman 3 Hari','warning');
        return;
      }
      const dataSend = {
        ...data,
        id,
        admin_id,
      };

      const result = await fetch(`${process.env.REACT_APP_API}/api/transaksi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataSend),
      });

      const hasil = await result.json();
      if (hasil.status === 200) {
        navigate("/manage-transaksi");
        swal("success", hasil.message, "success");
      } else {
        swal("failed", hasil.message, "warning");
      }
    } catch (error) {
      swal(
        "failed",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        "error"
      );
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Transaksi</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#!!">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Transaksi Buku</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Data Transaksi</h3>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} id="quickForm">
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="id-transaksi">ID Transaksi</label>
                        <input
                          type="text"
                          name="id-transaksi"
                          className="form-control"
                          id="id-transaksi"
                          value={generateID(props.count)}
                          placeholder="ID"
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Nama Peminjam</label>
                        <select
                          {...register("peminjam_id", { required: true })}
                          className="form-control select2"
                          style={{ width: "100%" }}
                        >
                          <option value={""}>Pilih</option>
                          {props.dataAnggota.map((anggota, i) => {
                            return (
                              <option
                                key={i}
                                value={anggota.id}
                              >{`${anggota.id}-${anggota.nama_peminjam}`}</option>
                            );
                          })}
                        </select>
                        {errors.peminjam_id && (
                          <p>Nama Peminjam is required.</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label>Nama Buku</label>
                        <select
                          {...register("buku_id", { required: true })}
                          className="form-control"
                        >
                          <option value={""}>Pilih</option>
                          {props.dataBuku.map((books, i) => {
                            return (
                              <option
                                key={i}
                                value={books.id}
                              >{`${books.id}-${books.nama_buku}`}</option>
                            );
                          })}
                        </select>
                        {errors.buku_id && <p>Nama Byuku is required.</p>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="alamat">Tanggal Peminjaman</label>
                        <input
                          type="date"
                          name="date"
                          className="form-control"
                          id="date"
                          placeholder="TGL"
                          {...register("start", { required: true })}
                        />
                        {errors.start && <p>Tgl is required.</p>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="date">Tanggal Pengembalian</label>
                        <input
                          type="date"
                          name="date"
                          className="form-control"
                          id="date"
                          placeholder="TGL"
                          {...register("end", { required: true })}
                        />
                        {errors.end && <p>Tgl is required.</p>}
                      </div>
                    </div>

                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                        <i className="fas fa-save mr-2"></i>SIMPAN
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/manage-transaksi")}
                        className="btn btn-success"
                        style={{ marginLeft: 5 }}
                      >
                        <i className="fas fa-arrow-right mr-2"></i>KEMBALI
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default DataTransaksi;
