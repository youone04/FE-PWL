const initialState = {
    dataAnggota: {
      loading: true,
      data: [],
      error: null,
    },
  };
  
  export const reducerAnggota = (state = initialState, action) => {
    switch (action.type) {
      case "GET_ANGGOTA_REQUEST":
        return {
          ...state,
          dataAnggota: {
            loading: true,
            data: [],
            error: null,
          },
        };
      case "GET_ANGGOTA_SUCCESS":
        return {
          ...state,
          dataAnggota: {
            loading: false,
            data: action.payload,
            error: null,
          },
        };
      case "GET_ANGGOTA_FAIL":
        return {
          ...state,
          dataAnggota: {
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      default:
        return state;
    }
  };
  