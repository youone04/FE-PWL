import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { getAdmin } from "../../config/redux/actions/getAdmin";
import { auth } from "../../config/redux/actions/authAction";
import { useEffect ,useState } from "react";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

const Pengguna = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [remountComponent, setRemountComponent] = useState(0);
  const [username , setUserName] = useState('none');
  const [role , setRole] = useState('none');

  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const { data, loading, error } = admin.dataAdmin;

  useEffect(() => {
    dispatch(getAdmin(search, offset, limit));
    dispatch(auth());
  }, [dispatch,search, offset, limit]);

  useEffect(() => {

    try{
      const data = localStorage.getItem('token');
      const decoded = jwt_decode(data);
      setUserName(decoded.username);
      console.log(decoded)
      setRole(decoded.role);
    }catch(error){
      alert(error)
    }

  },[])

  const handleDelete = (id) => {
    swal({
      title: "Apakah Kamu Yakin?",
      text: "Data akan di hapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const result = await fetch(
            `${process.env.REACT_APP_API}/api/admin/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
              },
            }
          );

          const hasil = await result.json();
          if (hasil.status === 200) {
            dispatch(getAdmin(search, offset, limit));
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

  const handleLimit = (e) => {
    e.preventDefault();
    setRemountComponent(Math.random());
    setLimit(e.target.value);
    setOffset(0);
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
          tambah="tambah-pengguna"
          title="Manage Pengguna"
          handleDelete={handleDelete}
          data={data.data}
          dataLength={data.count}
          limit={limit}
          setOffset={setOffset}
          offset={offset}
          remountComponent={remountComponent}
          setSearch={setSearch}
          handleLimit={handleLimit}
          username={username}
          role={role}
        />
      )}
    </>
  );
};
export default Pengguna;
