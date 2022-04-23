const initialState = {
    dataLogPeminjaman: {
      loading: true,
      data: [],
      error: null,
    },
  };
  
  export const reducerLogPeminjaman = (state = initialState, action) => {
    switch (action.type) {
      case "GET_PEMINJAMAN_LOG_REQUEST":
        return {
          ...state,
          dataLogPeminjaman: {
            loading: true,
            data: [],
            error: null,
          },
        };
      case "GET_PEMINJAMAN_LOG_SUCCESS":
        return {
          ...state,
          dataLogPeminjaman: {
            loading: false,
            data: action.payload,
            error: null,
          },
        };
      case "GET_PEMINJAMAN_LOG_FAIL":
        return {
          ...state,
          dataLogPeminjaman: {
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      default:
        return state;
    }
  };
  