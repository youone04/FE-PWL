import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const DataBuku = (props) => {
  function generateID(number) {
    if (number.toString().length === 2) {
      return `B00${number + 1}`;
    } else if (number.toString().length === 3) {
      return `B0${number + 1}`;
    } else if (number.toString().length === 4) {
      return `B${number + 1}`;
    }
    return `B000${number + 1}`;
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
      const id = generateID(props.data);
      const dataSend = {
        ...data,
        id,
        admin_id,
      };

      const result = await fetch(`${process.env.REACT_APP_API}/api/buku`, {
        method: "POST",
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
                          value={generateID(props.data)}
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
                          placeholder="2020"
                          {...register("jumlah_buku", { required: true })}
                        />
                        {errors.jumlah_buku && <p>Tahun terbit buku is required.</p>}
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
export default DataBuku;
