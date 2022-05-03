export const getLaporanDenda = (offset ,limit , month) => async (dispatch) => {
    try {
      const data = await fetch(`${process.env.REACT_APP_API}/api/laporan-denda?offset=${offset}&limit=${limit}&month=${month}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const hasil = await data.json();
      dispatch({
        type: "GET_LAPORAN_DENDA_SUCCESS",
        payload: hasil,
      });
    } catch (error) {
      dispatch({
        type: "GET_LAPORAN_DENDA_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  