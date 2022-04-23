const initialState = {
    dataLogPengembalian: {
      loading: true,
      data: [],
      error: null,
    },
  };
  
  export const reducerLogPengembalian = (state = initialState, action) => {
    switch (action.type) {
      case "GET_PENGEMBALIAN_LOG_REQUEST":
        return {
          ...state,
          dataLogPengembalian: {
            loading: true,
            data: [],
            error: null,
          },
        };
      case "GET_PENGEMBALIAN_LOG_SUCCESS":
        return {
          ...state,
          dataLogPengembalian: {
            loading: false,
            data: action.payload,
            error: null,
          },
        };
      case "GET_PENGEMBALIAN_LOG_FAIL":
        return {
          ...state,
          dataLogPengembalian: {
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      default:
        return state;
    }
  };
  