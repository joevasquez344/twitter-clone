import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
  getUserDetails,
  getUsersPosts,
  getUsersLikedPosts,
  follow,
  unfollow,
} from 'redux/auth/auth.actions';
import {useSelector, useDispatch} from 'react-redux';

const useProfile = () => {
  const {handle} = useParams();
  const dispatch = useDispatch();
  const {userDetails, isLoading} = useSelector((state) => state.auth);

  const follow = () => {};

  useEffect(() => {
    dispatch(getUserDetails(handle));
  }, []);

  //   if (!isLoading) return {userDetails, isLoading};
  //   else return isLoading;

  return {userDetails, isLoading};
};

export default useProfile;
