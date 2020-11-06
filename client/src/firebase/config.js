import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBge56SAyIfd4mEpWqsoal_yzzYkyFJx_w",
    authDomain: "twitter-f3797.firebaseapp.com",
    databaseURL: "https://twitter-f3797.firebaseio.com",
    projectId: "twitter-f3797",
    storageBucket: "twitter-f3797.appspot.com",
    messagingSenderId: "1005535071748",
    appId: "1:1005535071748:web:247dda89f88c08895bef51",
    measurementId: "G-ZZGLZM26NN"
  };

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const db = firebase.firestore();

export default firebase;