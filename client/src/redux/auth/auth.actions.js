import firebase from "../../firebase/config";
import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SET_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "./auth.types";

// export const setUser = (user) => (dispatch) => {
//   console.log(user)
//   dispatch({
//     type: SET_USER,
//     payload: { uid: user.uid, email: user.email },
//   });
// };

export const register = (handle, password, birthday) => async (dispatch) => {
  // firebase
  //   .auth()
  //   .createUserWithEmailAndPassword(email, password)
  //   .then((user) => {
  //     dispatch({
  //       type: REGISTER_SUCCESS,
  //       payload: { user: user.user.uid, email: user.user.email },
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     dispatch({
  //       type: REGISTER_FAILED,
  //       payload: err.message,
  //     });
  //   });

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

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
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
