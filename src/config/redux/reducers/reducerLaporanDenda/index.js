const initialState = {
    dataDenda: {
      loading: true,
      data: [],
      error: null,
    },
  };
  
  export const reducerLaporanDenda = (state = initialState, action) => {
    switch (action.type) {
      case "GET_LAPORAN_DENDA_SUCCESS":
        return {
          ...state,
          dataDenda: {
            loading: false,
            data: action.payload,
            error: null,
          },
        };
      case "GET_LAPORAN_DENDA_FAIL":
        return {
          ...state,
          dataDenda: {
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      default:
        return state;
    }
  };
  