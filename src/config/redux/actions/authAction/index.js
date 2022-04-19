export const auth = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    dispatch({ type: "GET_AUTH_REQUEST" });
    const data = await fetch(`${process.env.REACT_APP_API}/api/auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const hasil = await data.json();
    if (hasil.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
      return
    }
    dispatch({
      type: "GET_AUTH_SUCCESS",
      payload: hasil,
    });
  } catch (error) {
    dispatch({
      type: "GET_AUTH_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
