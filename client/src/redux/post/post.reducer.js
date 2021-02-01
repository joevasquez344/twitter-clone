import {DeviceHub} from '@material-ui/icons';
import {
  GET_POSTS,
  CREATE_POST,
  REQUEST_SENT,
  GET_POST_BY_ID,
  UPDATE_LIKES,
} from './post.types';

const initialState = {
  posts: [],
  post: {},
  isLoading: true,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case REQUEST_SENT:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POSTS:
      // debugger;
      return {
        ...state,
        posts: payload,
        isLoading: false,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        isLoading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes} : post),
        isLoading: false,
      };
    case GET_POST_BY_ID:
      return {
        ...state,
        post: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
