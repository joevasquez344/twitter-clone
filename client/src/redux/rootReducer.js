import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import postReducer from './post/post.reducer';
import miscReducer from './misc/misc.reducer';

export default combineReducers({
    auth: authReducer,
    post: postReducer,
    misc: miscReducer
})