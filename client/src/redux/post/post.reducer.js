import { GET_POSTS, CREATE_POST } from "./post.types";

const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
      };
      case CREATE_POST:
        return {
          ...state,
          posts: [...state.posts, payload]
        }
    default:
      return state;
  }
};
