import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { getLogPengembalian } from "../../../config/redux/actions/getLogPengembalian";
import { auth } from "../../../config/redux/actions/authAction";
import { useEffect } from "react";

const LogPengembalian = () => {
  const log_pengembalian = useSelector((state) => state.log_pengembalian);
  const dispatch = useDispatch();
  const { data, loading, error } = log_pengembalian.dataLogPengembalian;

  useEffect(() => {
    dispatch(getLogPengembalian());
    dispatch(auth());
  }, [dispatch]);

  console.log(data)

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
          denda={data.total_denda}
          title="Manage Log Pengembalian"
        />
      )}
    </>
  );
};
export default LogPengembalian;
