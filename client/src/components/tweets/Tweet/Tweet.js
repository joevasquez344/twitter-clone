import React from "react";
import './Tweet.scss';

const Tweet = ({tweet}) => {
  return (
    <div className="tweet">
      <img className='tweet__profileImage' src="" alt="" />
      <section>
        <header>
          <div className="tweet__displayName">Joe</div>
          <div className="tweet__handle">@Zook_sc</div>
        </header>
        <p className="tweet__text">
         {tweet.text}
        </p>
        <img className="tweet__graphic" src="" alt="" />
      </section>
    </div>
  );
};

export default Tweet;