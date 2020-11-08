import React, { useEffect } from "react";
import "./Home.scss";

import TweetFeed from "components/tweets/TweetFeed";
import CreateTweet from "components/tweets/CreateTweet";

import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "redux/post/post.actions";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <div className="home">
      <CreateTweet />
      <TweetFeed posts={posts} />
    </div>
  );
};

export default Home;
