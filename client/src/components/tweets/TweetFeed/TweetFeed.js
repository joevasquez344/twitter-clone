import React from "react";
import "./TweetFeed.css";

import Tweet from "components/tweets/Tweet/Tweet.js";

const TweetFeed = ({ tweets }) => {
  console.log("Tweets from feed: ", tweets);
  return (
    <div className="tweet-feed">
      {tweets.map((tweet) => {
        return <Tweet tweet={tweet} />;
      })}
    </div>
  );
};

export default TweetFeed;
