import firebase from "../../firebase/config";

import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SET_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "./auth.types";

export const setUser = (user) => (dispatch) => {
  console.log(user)
  dispatch({
    type: SET_USER,
    payload: { uid: user.uid, email: user.email },
  });
};

export const register = (email, password) => (dispatch) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { user: user.user.uid, email: user.user.email },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: REGISTER_FAILED,
        payload: err.message,
      });
    });
};

export const login = (email, password) => (dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);
      if (user) {
        const _user = { uid: user.user.uid, email: user.user.email };
        console.log("User: ", _user);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: _user,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAILED,
        payload: err.message,
      });
    });
};

export const logout = () => (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sign Out success");
      dispatch({
        type: LOGOUT,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
