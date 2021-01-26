import {GET_URL} from './misc.types';

export const getUrl = (url) => (dispatch, getState) => {
    dispatch({
        type: GET_URL,
        payload: url
    })
}

