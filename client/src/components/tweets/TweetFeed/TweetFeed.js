import React from 'react';
import './TweetFeed.css';
import Tweet from 'components/tweets/Tweet';

const TweetFeed = ({posts}) => {
  return (
    <div className="tweet-feed">
      {posts.map((post) => {
        return <Tweet key={post._id} post={post} />
      })}
    </div>
  );
};

export default TweetFeed;
