import React, {useEffect} from "react";
import "./Home.scss";

import TweetFeed from "components/tweets/TweetFeed";
import CreateTweet from "components/tweets/CreateTweet";

import { connect } from "react-redux";
import { getTweets } from "redux/tweet/tweet.actions";

const Home = ({getTweets, tweets}) => {
  useEffect(() => {
    getTweets();
  }, []);
  return (
    <div className="home">
      <CreateTweet />
      <TweetFeed tweets={tweets} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  tweets: state.tweet.tweets
})

export default connect(mapStateToProps, {getTweets})(Home);
