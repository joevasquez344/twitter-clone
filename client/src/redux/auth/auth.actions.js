import firebase from '../../firebase/config';
import axios from 'axios';

import {
  REQUEST_SENT,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SET_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  GET_USERS_POSTS,
  GET_USERS_LIKED_POSTS,
  GET_FOLLOWERS,
  FOLLOW,
  UNFOLLOW,
  CLEAR_USER_DETAILS_FROM_STORAGE,
  GET_FOLLOWING,
} from './auth.types';

export const register = (handle, password, birthday) => async (dispatch) => {
  const body = {handle, password, birthday};

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const {data} = await axios.post('/api/users', body, config);

  if (data) {
    console.log(data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem('user', JSON.stringify(data));

    getUserDetails(data.handle)
  } else {
    dispatch({
      type: REGISTER_FAILED,
      payload: 'Not Authenticated',
    });
  }
};

export const login = (handle, password) => async (dispatch) => {
  try {
    const body = {
      handle,
      password,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {data, status} = await axios.post('/api/users/login', body, config);

    const user = data;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

 
  

    localStorage.setItem('user', JSON.stringify(user));

    console.log('AUTH HANDLE: ', user.handle)

    getUserDetails(user.handle);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: error,
    });
  }
  // firebase
  //   .auth()
  //   .signInWithEmailAndPassword(email, password)
  //   .then((user) => {
  //     console.log(user);
  //     if (user) {
  //       const _user = { uid: user.user.uid, email: user.user.email };
  //       console.log("User: ", _user);
  //       dispatch({
  //         type: LOGIN_SUCCESS,
  //         payload: _user,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: LOGIN_FAILED,
  //       payload: err.message,
  //     });
  //   });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });

  localStorage.removeItem('user');
  // firebase
  //   .auth()
  //   .signOut()
  //   .then(() => {
  //     console.log("Sign Out success");
  //     dispatch({
  //       type: LOGOUT,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

export const getUserDetails = (handle) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_SENT,
    });

    const token = getState().auth.user.token;

    console.log('Token from action', token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log('AUTH HANDLE: ', handle)

    const {data} = await axios.get(`/api/users/${handle}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userDetails', JSON.stringify(data));
    return getState().auth.userDetails;
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILED,
      payload: 'User Not Found',
    });
  }
};

export const getUsersPosts = (handle) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_SENT,
    });

    const token = getState().auth.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const {data} = await axios.get(`/api/users/${handle}/posts`, config);

    const posts = data;

    dispatch({
      type: GET_USERS_POSTS,
      payload: posts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsersLikedPosts = (handle, userId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: REQUEST_SENT,
    });

    const token = getState().auth.user.token;
    console.log('Token from action', token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const {data} = await axios.get(`/api/users/${handle}/${userId}/likes`, config);

    dispatch({
      type: GET_USERS_LIKED_POSTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFollowers = (handle) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_SENT,
    });
    const token = getState().auth.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const {data} = await axios.get(`/api/users/${handle}/followers`, config);

    dispatch({
      type: GET_FOLLOWERS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const follow = (handle) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_SENT,
    });
    const token = getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const {data} = await axios.post(`/api/users/${handle}/follow`, {}, config);
 

    dispatch({
      type: FOLLOW,
      payload: data,
    });
  } catch (error) {
    console.error(error.message);
  }
};
export const unfollow = (handle) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_SENT,
    });
    const token = getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log('unfollowing');

    const {data} = await axios.put(`/api/users/${handle}/unfollow`, {}, config);


    dispatch({
      type: UNFOLLOW,
      payload: data,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const getFollowing = (handle) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_SENT,
    });

    const token = getState().auth.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const {data} = await axios.get(`/api/users/${handle}/following`, config);

    dispatch({
      type: GET_FOLLOWING,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const clearUserDetailsFromStorage = () => (dispatch) => {
  dispatch({
    type: CLEAR_USER_DETAILS_FROM_STORAGE,
  });
  localStorage.removeItem('userDetails');
};
