import { GET_URL } from "./misc.types";

const initialState = {
  url: "",
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_URL:
      return {
        ...state,
        url: payload,
      };
    default:
      return state;
  }
};
