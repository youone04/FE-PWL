export const getPeminjam = (search , offset ,limit) => async (dispatch) => {
    try {
      // dispatch({ type: "GET_ANGGOTA_REQUEST" });
      const data = await fetch(`${process.env.REACT_APP_API}/api/peminjam?search=${search}&offset=${offset}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const hasil = await data.json();
      dispatch({
        type: "GET_ANGGOTA_SUCCESS",
        payload: hasil,
      });
    } catch (error) {
      dispatch({
        type: "GET_ANGGOTA_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  