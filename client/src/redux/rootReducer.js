import { combineReducers } from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import authReducer from './auth/auth.reducer';
import postReducer from './post/post.reducer';

export default combineReducers({
    auth: authReducer,
    post: postReducer,
})