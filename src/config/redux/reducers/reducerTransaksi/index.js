const initialState = {
    dataTransaksi: {
      loading: true,
      data: [],
      error: null,
    },
  };
  
  export const reducerTransaksi = (state = initialState, action) => {
    switch (action.type) {
      case "GET_TRANSAKSI_REQUEST":
        return {
          ...state,
          dataTransaksi: {
            loading: true,
            data: [],
            error: null,
          },
        };
      case "GET_TRANSAKSI_SUCCESS":
        return {
          ...state,
          dataTransaksi: {
            loading: false,
            data: action.payload,
            error: null,
          },
        };
      case "GET_TRANSAKSI_FAIL":
        return {
          ...state,
          dataTransaksi: {
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      default:
        return state;
    }
  };
  