import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const EditBuku = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, nama_buku, jumlah_buku } = state;

  useEffect(() => {
    setValue("nama_buku", nama_buku);
    setValue("jumlah_buku", jumlah_buku);
  }, [jumlah_buku,nama_buku,setValue]);

  const onSubmit = async (data) => {
    const dataSend = {
      ...data,
    };
    try {
      const result = await fetch(`${process.env.REACT_APP_API}/api/buku/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataSend),
      });
      const hasil = await result.json();
      if (hasil.status === 200) {
        navigate("/manage-buku");
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
                    <a href="#!">Home</a>
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
                    <h3 className="card-title">Data Buku</h3>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} id="quickForm">
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="id-buku">ID BUKU</label>
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
                        <label htmlFor="nama-buku">Nama Buku</label>
                        <input
                          type="text"
                          name="nama buku"
                          className="form-control"
                          id="nama-buku"
                          placeholder="Buku"
                          {...register("nama_buku", { required: true })}
                        />
                        {errors.nama_buku && <p>Nama buku is required.</p>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="nama-buku">Tahun Terbit</label>
                        <input
                          type="text"
                          name="jumlah buku"
                          className="form-control"
                          id="jumlah-buku"
                          placeholder="Jumlah"
                          {...register("jumlah_buku", { required: true })}
                        />
                        {errors.jumlah_buku && <p>Tahun terbit buku is required.</p>}
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                      <i className="fas fa-save mr-2"/>SIMPAN
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/manage-buku")}
                        className="btn btn-success"
                        style={{ marginLeft: 5 }}
                      >
                         <i className="fas fa-arrow-right mr-2"></i> KEMBALI
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
export default EditBuku;
