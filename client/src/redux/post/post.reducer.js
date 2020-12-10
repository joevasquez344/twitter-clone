import { GET_POSTS, CREATE_POST, REQUEST_SENT, LIKE_POST, UNLIKE_POST } from "./post.types";

const initialState = {
  posts: [],
  isLoading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_SENT:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        isLoading: false,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        isLoading: false,
      };
    case LIKE_POST:
      return {
        ...state,
        posts: payload,
        isLoading: false,
      };
    case UNLIKE_POST:
      return {
        ...state,
        posts: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
