import React, { useEffect, useState } from "react";
import "./TweetFeed.css";

import Tweet from "components/tweets/Tweet";
import Reply from "components/tweets/Reply"

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../redux/post/post.actions";

const TweetFeed = ({ posts, isLoading }) => {
  return (
    <>
      {" "}
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="tweet-feed">
          {posts.map((post) => {
            return <Tweet post={post} />;
          })}
        </div>
      )}{" "}
    </>
  );
};

export default TweetFeed;
