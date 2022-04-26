const initialState = {
    dataBuku: {
      loading: true,
      data: [],
      error: null,
    },
  };
  
  export const reducerBuku = (state = initialState, action) => {
    switch (action.type) {
      case "GET_BUKU_SUCCESS":
        return {
          ...state,
          dataBuku: {
            loading: false,
            data: action.payload,
            error: null,
          },
        };
      case "GET_BUKU_FAIL":
        return {
          ...state,
          dataBuku: {
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      default:
        return state;
    }
  };
  