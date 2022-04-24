const initialState = {
    dataDashboard: {
      loading: true,
      data: [],
      error: null,
    },
  };
  
  export const reducerDashboard = (state = initialState, action) => {
    switch (action.type) {
      case "GET_DASHBOARD_REQUEST":
        return {
          ...state,
          dataDashboard: {
            loading: true,
            data: [],
            error: null,
          },
        };
      case "GET_DASHBOARD_SUCCESS":
        return {
          ...state,
          dataDashboard: {
            loading: false,
            data: action.payload,
            error: null,
          },
        };
      case "GET_DASHBOARD_FAIL":
        return {
          ...state,
          dataDashboard: {
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      default:
        return state;
    }
  };
  