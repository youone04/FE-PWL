import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {useEffect , useState} from 'react';

const DataPengguna = (props) => {
  const [role , setRole] = useState('none');

  function generateID(number) {
    if (number?.toString() === 2) {
      return `P00${number + 1}`;
    } else if (number?.toString() === 3) {
      return `P0${number + 1}`;
    } else if (number?.toString() === 4) {
      return `P${number + 1}`;
    }
    return `P000${number + 1}`;
  }
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
     
      const id = generateID(props.count);
      const dataSend = {
        ...data,
        id,
      };

      const result = await fetch(`${process.env.REACT_APP_API}/api/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataSend),
      });

      const hasil = await result.json();
      if (hasil.status === 200) {
        navigate("/pengguna");
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

  useEffect(() => {

    try{
      const data = localStorage.getItem('token');
      const decoded = jwt_decode(data);
      setRole(decoded.role);
    }catch(error){
      swal('Failed','session habis','warning')
    }

  },[])

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
                    <a href="/dashboard">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Tambah Pengguna</li>
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
                    <h3 className="card-title">Data Pengguna</h3>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} id="quickForm">
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="id-buku">ID Pengguna</label>
                        <input
                          type="text"
                          name="id-buku"
                          className="form-control"
                          id="id-buku"
                          value={generateID(props.count)}
                          placeholder="ID"
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="username">USername</label>
                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          id="username"
                          placeholder="Username"
                          {...register("username", { required: true })}
                        />
                        {errors.username && <p>Username is required.</p>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="alamat">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="Password"
                          placeholder="Password"
                          {...register("password", { required: true })}
                        />
                        {errors.Password && <p>Passoword is required.</p>}
                      </div>
                      <div className="form-group">
                        <label>Role</label>
                        <select {...register("role", { required: true })} className="form-control">
                          <option>Pilih</option>
                          {
                            role === 'admin'?
                           <>
                            <option value={'petugas'}>Petugas</option>
                            <option value={'admin'}>Admin</option>
                           </>:
                            <option value={'petugas'}>Petugas</option>
                          }
                         
                          {/* <option>Perempuan</option> */}
                        </select>
                        {errors.role && <p>role is required.</p>}
                      </div>
                    </div>

                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                        <i className="fas fa-save mr-2"></i>SIMPAN
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/pengguna")}
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
export default DataPengguna;
