const initialState = {
    dataAdmin: {
      loading: true,
      data: [],
      error: null,
    },
  };
  
  export const reducerAdmin = (state = initialState, action) => {
    switch (action.type) {
      case "GET_ADMIN_REQUEST":
        return {
          ...state,
          dataAdmin: {
            loading: true,
            data: [],
            error: null,
          },
        };
      case "GET_ADMIN_SUCCESS":
        return {
          ...state,
          dataAdmin: {
            loading: false,
            data: action.payload,
            error: null,
          },
        };
      case "GET_ADMIN_FAIL":
        return {
          ...state,
          dataAdmin: {
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      default:
        return state;
    }
  };
  