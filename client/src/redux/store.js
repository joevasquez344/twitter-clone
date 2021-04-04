import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import async from './middleware/async';

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;


const userDetailsFromStorage = localStorage.getItem('userDetails')
  ? JSON.parse(localStorage.getItem('userDetails'))
  : null;

  const postsFromStorage = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : [];
  const postDetailsFromStorage = localStorage.getItem('postDetails') ? JSON.parse(localStorage.getItem('postDetails')) : {};

const initialState = {
  auth: {user: userFromStorage, userDetails: userDetailsFromStorage},
  post: { posts: postsFromStorage, post: postDetailsFromStorage}
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
