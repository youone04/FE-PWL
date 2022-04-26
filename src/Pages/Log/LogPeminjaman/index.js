import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { getLogPeminjaman } from "../../../config/redux/actions/getLogPeminjaman";
import { auth } from "../../../config/redux/actions/authAction";
import { useEffect,useState } from "react";

const LogPeminjaman = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [remountComponent, setRemountComponent] = useState(0);

  const log_peminjaman = useSelector((state) => state.log_pinjam);
  const dispatch = useDispatch();
  const { data, loading, error } = log_peminjaman.dataLogPeminjaman;

  useEffect(() => {
    dispatch(getLogPeminjaman(search, offset, limit));
    dispatch(auth());
  }, [dispatch,search, offset, limit]);

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
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      ) : (
        <Table
          title="Manage Log Peminjaman"
          data={data.data}
          dataLength={data.count}
          limit={limit}
          setOffset={setOffset}
          offset={offset}
          remountComponent={remountComponent}
          setSearch={setSearch}
          handleLimit={handleLimit}
        />
      )}
    </>
  );
};
export default LogPeminjaman;
