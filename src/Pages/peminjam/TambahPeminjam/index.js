import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const DataPeminjam = (props) => {
  function generateID(number) {
    if (number.toString().length === 2) {
      return `A00${number + 1}`;
    } else if (number.toString().length === 3) {
      return `A0${number + 1}`;
    } else if (number.toString().length === 4) {
      return `A${number + 1}`;
    }
    return `A000${number + 1}`;
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
      const id = generateID(props.data.length);
      const dataSend = {
        ...data,
        id,
        admin_id,
      };

      const result = await fetch(`${process.env.REACT_APP_API}/api/peminjam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataSend),
      });

      const hasil = await result.json();
      if (hasil.status === 200) {
        navigate("/manage-peminjam");
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
                <h1>Tambah Buku</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Tambah Bukuu</li>
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
                    <h3 className="card-title">Data Peminjam</h3>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} id="quickForm">
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="id-buku">ID Peminjam</label>
                        <input
                          type="text"
                          name="id-buku"
                          className="form-control"
                          id="id-buku"
                          value={generateID(props.data.length)}
                          placeholder="ID"
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="nama-peminjam">Nama Peminjam</label>
                        <input
                          type="text"
                          name="nama peminjam"
                          className="form-control"
                          id="nama-peminjam"
                          placeholder="Peminjam"
                          {...register("nama_peminjam", { required: true })}
                        />
                        {errors.nama_buku && <p>Naa Peminjam is required.</p>}
                      </div>




                      <div className="form-group">
                        <label htmlFor="alamat">Alamat</label>
                        <input
                          type="text"
                          name="alamat"
                          className="form-control"
                          id="alamat"
                          placeholder="Alamat"
                          {...register("alamat", { required: true })}
                        />
                        {errors.alamat && <p>alamat is required.</p>}
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                        <i className="fas fa-save mr-2"></i>SIMPAN
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/manage-buku")}
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
export default DataPeminjam;
