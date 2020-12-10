import React, { useEffect } from "react";
import "./TweetFeed.css";

import Tweet from "components/tweets/Tweet/Tweet.js";

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../redux/post/post.actions";

const TweetFeed = ({ posts }) => {
  console.log("Tweets from feed: ", posts);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, []);

  return (
    <div className="tweet-feed">
      {posts.map((post) => {
        return <Tweet post={post} />;
      })}
    </div>
  );
};

export default TweetFeed;
