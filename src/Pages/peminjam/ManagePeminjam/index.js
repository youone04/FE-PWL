import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { getPeminjam } from "../../../config/redux/actions/getAnggota";
import { auth } from "../../../config/redux/actions/authAction";
import { useEffect } from "react";
import swal from "sweetalert";

const ManagePeminjam = () => {
    const anggota = useSelector((state) => state.anggota);
    const dispatch = useDispatch();
    const { data, loading, error } = anggota.dataAnggota;
  
    useEffect(() => {
      dispatch(getPeminjam());
      dispatch(auth());
    }, [dispatch]);

    return(
        <>
        {
            loading?<p>loading</p>:
            <Table 
            data={data.data}
            tambah="tambah-anggota"
            title="Manage Anggota"
            />
        }
        </>
    )
}
export default ManagePeminjam;