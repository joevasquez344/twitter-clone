import {
  REQUEST_SENT,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SET_USER,
  LOGOUT,
  USER_DETAILS_FAILED,
  USER_DETAILS_SUCCESS,
  GET_USERS_POSTS,
  GET_USERS_LIKED_POSTS,
  GET_FOLLOWERS,
} from "./auth.types";

const initialState = {
  user: null,
  userDetails: null,
  isLoading: true,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_SENT:
      return {
        ...state,
        isLoading: true,
      };
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
        userDetails: null,
        isLoading: false,
        error: null,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userDetails: payload,
        error: null,
      };
    case USER_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        userDetails: null,
        error: payload,
      };
    case GET_USERS_POSTS:
      return {
        ...state,
        isLoading: false,
        userDetails: { ...state.userDetails, posts: payload },
        error: null,
      };
    case GET_USERS_LIKED_POSTS:
      return {
        ...state,
        isLoading: false,
        userDetails: { ...state.userDetails, likes: payload },
        error: null,
      };

      case GET_FOLLOWERS: 
      return {
        ...state,
        isLoading: false,
        userDetails: {...state.userDetails, followers: payload},
        error: null
      }

    default:
      return state;
  }
};
