const initialState = {
  dataAuth: {
    loading: true,
    data: [],
    error: null,
  },
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_AUTH_REQUEST":
      return {
        ...state,
        dataAuth: {
          loading: true,
          data: [],
          error: null,
        },
      };
    case "GET_AUTH_SUCCESS":
      return {
        ...state,
        dataAuth: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case " GET_AUTH_FAIL":
      return {
        ...state,
        dataAuth: {
          loading: false,
          data: [],
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
