import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { getLaporanDenda } from "../../../config/redux/actions/getLaporanDenda";
import { auth } from "../../../config/redux/actions/authAction";
import { useEffect, useState } from "react";

const LaporanDenda = () => {
  const dateNow = new Date();
  const months = dateNow.getMonth() + 1;
  const year = dateNow.getFullYear();
  let convertMonth = months.toString().length === 1? `0${months}` : months;
  const [limit, setLimit] = useState(5);

  const [offset, setOffset] = useState(0);
  const [remountComponent, setRemountComponent] = useState(0);

  const [month, setMonth] = useState(`${year}-${convertMonth}`);

  const laporan_denda = useSelector((state) => state.laporan_denda);
  const dispatch = useDispatch();
  const { data, loading, error } = laporan_denda.dataDenda;

  useEffect(() => {
    dispatch(getLaporanDenda(offset, limit, month));
    dispatch(auth());
  }, [dispatch, offset, limit, month]);

  const handleLimit = (e) => {
    e.preventDefault();
    setRemountComponent(Math.random());
    setLimit(e.target.value);
    setOffset(0);
  };

  const handleChangeMonth = (data) => {
    setMonth(data);
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
          title="Laporan Denda"
          data={data.data}
          denda={data.denda}
          dataLength={data.count}
          limit={limit}
          setOffset={setOffset}
          offset={offset}
          remountComponent={remountComponent}
          handleLimit={handleLimit}
          handleChangeMonth={handleChangeMonth}
          month={month}
        />
      )}
    </>
  );
};
export default LaporanDenda;
