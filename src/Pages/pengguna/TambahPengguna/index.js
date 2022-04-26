import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../../config/redux/actions/authAction";
import { useEffect } from "react";
import DataPengguna from "./DataPengguna";
import { getAdmin } from "../../../config/redux/actions/getAdmin";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const TambahPengguna = () => {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const { data , loading , error } = admin.dataAdmin;
  const Navigate = useNavigate();
  useEffect(() => {
    // "",0,data?.data?.length
    dispatch(getAdmin("",0,5));
    dispatch(auth());
  }, [dispatch]);

  useEffect(() => {
    try{
      const data = localStorage.getItem('token');
      const decoded = jwt_decode(data);
      if(decoded.role!=='admin'){
        Navigate('/pengguna')
      }
    }catch(error){
      alert(error)
    }

  },[])

  return (
    <>
      {loading ? (
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error  ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <DataPengguna 
        data={data.data}
        count={data.count}
         />
      )}
    </>
  );
};
export default TambahPengguna;
