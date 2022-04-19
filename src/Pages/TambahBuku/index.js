import { useSelector, useDispatch } from "react-redux";
import { getBuku } from "../../config/redux/actions/getBuku";
import { useEffect } from 'react';
import DataBuku from "./DataBuku";

const TambahBuku = () => {
  const buku = useSelector((state) => state.buku);
  const dispatch = useDispatch();
  const {data ,loading, error } = buku.dataBuku;

  useEffect(() => {
      dispatch(getBuku());
    },[dispatch])


  return (
    <>
    {
      loading?<p>loading</p>:
      <DataBuku data={data.data}/>
    }
    </>
  );
};
export default TambahBuku;
