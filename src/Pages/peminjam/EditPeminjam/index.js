import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate, useLocation } from "react-router-dom";

const EditDataPeminjam = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, nama_peminjam, jk, alamat, hp } = state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id,
      nama_peminjam,
      jk,
      alamat,
      hp,
    },
  });

  const onSubmit = async (data) => {
    try {

      const result = await fetch(
        `${process.env.REACT_APP_API}/api/peminjam/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const hasil = await result.json();
      if (hasil.status === 200) {
        navigate("/manage-anggota");
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
                          value={id}
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
                        {errors.nama_peminjam && (
                          <p>Naa Peminjam is required.</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label>Jenis Kelamin</label>
                        <select
                          {...register("jk", { required: true })}
                          className="form-control"
                        >
                          <option>Pilih</option>
                          <option>Laki-Laki</option>
                          <option>Perempuan</option>
                        </select>
                        {errors.jk && <p>jenis_kelamin is required.</p>}
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
                      <div className="form-group">
                        <label htmlFor="no_hp">No HP</label>
                        <input
                          type="number"
                          name="no_hp"
                          className="form-control"
                          id="no_hp"
                          placeholder="0857xxxxxx"
                          {...register("hp", { required: true })}
                        />
                        {errors.hp && <p>Hp is required.</p>}
                      </div>
                    </div>

                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                        <i className="fas fa-save mr-2"></i>SIMPAN
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/manage-anggota")}
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
export default EditDataPeminjam;
