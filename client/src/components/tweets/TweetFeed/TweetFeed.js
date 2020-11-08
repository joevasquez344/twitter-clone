import React from "react";
import "./TweetFeed.css";

import Tweet from "components/tweets/Tweet/Tweet.js";

const TweetFeed = ({ posts }) => {
  console.log("Tweets from feed: ", posts);
  return (
    <div className="tweet-feed">
      {posts.map((post) => {
        return <Tweet post={post} />;
      })}
    </div>
  );
};

export default TweetFeed;
