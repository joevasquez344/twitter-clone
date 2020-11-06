import {
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SET_USER,
  LOGOUT,
} from "./auth.types";

const initialState = {
  user: null,
  isLoading: true,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false,
        error: null,
      };

    case LOGIN_FAILED:
      console.log("Login Error: ", payload);
      return {
        ...state,
        user: null,
        isLoading: false,
        error: payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false,
        error: null,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null,
      };

    default:
      return state;
  }
};
