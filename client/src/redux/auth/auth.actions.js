import firebase from "../../firebase/config";
import axios from "axios";

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
  CLEAR_USER_DETAILS_FROM_STORAGE,
  GET_FOLLOWING
} from "./auth.types";

// export const setUser = (user) => (dispatch) => {
//   console.log(user)
//   dispatch({
//     type: SET_USER,
//     payload: { uid: user.uid, email: user.email },
//   });
// };

export const register = (handle, password, birthday) => async (dispatch) => {
  const body = { handle, password, birthday };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.post("/api/users", body, config);

  if (data) {
    console.log(data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } else {
    dispatch({
      type: REGISTER_FAILED,
      payload: "Not Authenticated",
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
        "Content-Type": "application/json",
      },
    };
    const { data, status } = await axios.post("/api/users/login", body, config);

    const user = data;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });

    localStorage.setItem("user", JSON.stringify(user));
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

  localStorage.removeItem("user");
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

export const getUserDetails = (id) => async (dispatch, getState) => {
  console.log("User Id from actions: ", id);
  try {
    dispatch({
      type: REQUEST_SENT,
    });

    const token = getState().auth.user.token;

    console.log("Token from action", token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);
    console.log("User Details from action", data);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userDetails", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILED,
      payload: "User Not Found",
    });
  }
};

export const getUsersPosts = (userID) => async (dispatch, getState) => {
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

    const { data } = await axios.get(`/api/users/${userID}/posts`, config);

    const posts = data;

    dispatch({
      type: GET_USERS_POSTS,
      payload: posts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsersLikedPosts = (userID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_SENT,
    });

    const token = getState().auth.user.token;
    console.log("Token from action", token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${userID}/likes`, config);

    dispatch({
      type: GET_USERS_LIKED_POSTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFollowers = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_SENT
    })
    const token = getState().auth.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}/followers`, config);

    console.log('DATAAA: ', data);

    const followers = data;

    console.log("Followers: ", followers);

    dispatch({
      type: GET_FOLLOWERS,
      payload: followers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const follow = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_SENT
    })
    const token = getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.post(`/api/users/${id}/follow`, {}, config);

    dispatch({
      type: FOLLOW,
      payload: data
    })
  } catch (error) {
    console.error(error.message);
  }
}

export const getFollowing = (id) => async (dispatch, getState) => {
   try {
     dispatch({
       type: REQUEST_SENT,
     })

     const token = getState().auth.user.token;

     const config = {
       headers: {
         Authorization: `Bearer ${token}`
       }
     }

     const {data} = await axios.get(`/api/users/${id}/following`, config)

     dispatch({
       type: GET_FOLLOWING,
       payload: data
     })
   } catch (error) {
     console.error(error)
   }
}

export const clearUserDetailsFromStorage = () => dispatch => {
  dispatch({
    type: CLEAR_USER_DETAILS_FROM_STORAGE
  })
  localStorage.removeItem("userDetails");
}