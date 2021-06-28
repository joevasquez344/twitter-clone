import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPostById} from 'redux/post/post.actions';

const usePostDetails = (postId) => {
    const dispatch = useDispatch();
    const {post, isLoading} = useSelector(state => state.post)
    
    useEffect(() => {
        dispatch(getPostById(postId));
    }, [])

    return {post, isLoading}
}

export default usePostDetails
