import { combineReducers } from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import authReducer from './auth/auth.reducer';
import tweetReducer from './tweet/tweet.reducer';

export default combineReducers({
    auth: authReducer,
    tweet: tweetReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})