export const getLogPengembalian = (search, offset, limit) => async (dispatch) => {
    try {
      const data = await fetch(`${process.env.REACT_APP_API}/api/log-pengembalian?search=${search}&offset=${offset}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const hasil = await data.json();
      dispatch({
        type: "GET_PENGEMBALIAN_LOG_SUCCESS",
        payload: hasil,
      });
    } catch (error) {
      dispatch({
        type: "GET_PENGEMBALIAN_LOG_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  