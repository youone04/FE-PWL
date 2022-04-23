import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { getLogPeminjaman } from "../../../config/redux/actions/getLogPeminjaman";
import { auth } from "../../../config/redux/actions/authAction";
import { useEffect } from "react";

const LogPeminjaman = () => {
  const log_peminjaman = useSelector((state) => state.log_pinjam);
  const dispatch = useDispatch();
  const { data, loading, error } = log_peminjaman.dataLogPeminjaman;

  useEffect(() => {
    dispatch(getLogPeminjaman());
    dispatch(auth());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      ) : (
        <Table
          data={data.data}
          title="Manage Log Peminjaman"
        />
      )}
    </>
  );
};
export default LogPeminjaman;
