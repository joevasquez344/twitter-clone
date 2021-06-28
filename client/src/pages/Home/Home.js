import React, {useEffect} from 'react';
import './Home.scss';
import Spinner from 'react-bootstrap/Spinner';

import TweetFeed from 'components/tweets/TweetFeed';
import CreateTweet from 'components/tweets/CreateTweet';
import Header from 'layout/Header';

import {useSelector, useDispatch} from 'react-redux';
import {getPosts} from 'redux/post/post.actions';

const Home = () => {
  const dispatch = useDispatch();
  const {posts, isLoading} = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts());

  

    // console.log('TADN: ', hello)
  }, []);
  return (
    <div className="home">
      <Header />
      <CreateTweet />
      {isLoading ? (
        <div className="spinner">
          {' '}
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <TweetFeed posts={posts} />
      )}
    </div>
  );
};

export default Home;
