import React, { useState, useEffect } from "react";
import "./Profile.scss";

import { connect } from "react-redux";
import { getTweets } from "../../redux/tweet/tweet.actions";

import TweetFeed from "components/tweets/TweetFeed/TweetFeed";
import UpdateProfileModal from "components/modals/UpdateProfileModal";

const Profile = ({ getTweets, tweets }) => {
  const [isModalPresent, setIsModalPresent] = useState(false);

  const hideModal = () => setIsModalPresent(false);
  const showModal = () => setIsModalPresent(true);

  useEffect(() => {
    getTweets();
  }, []);

  console.log("Tweets: ", tweets);
  return (
    <div className="profile">
      {isModalPresent ? <UpdateProfileModal hideModal={hideModal} /> : null}
      <div className="profile__banner">
        <img src="" alt="" />
      </div>
      <div className="profile__info">
        <div className="profile__config">
          <img src="" className="profile__image" />
          <button onClick={showModal} className="profile__editBtn">
            Edit Profile
          </button>
        </div>
        <div className="profile__names">
          <h5>Joe</h5>
          <small>@Zook_sc</small>
        </div>
        <div className="profile__locationAndDate">
          <div>
            <span>
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <span>California, USA</span>
          </div>
          <div>
            <span>
              <i className="far fa-calendar-alt"></i>
            </span>
            <span>Joined July 2015</span>
          </div>
        </div>
        <div className="profile__follow">
          <div>
            <span className="profile__followingCount">37</span>
            <span className="profile__followingText">Following</span>
          </div>
          <div>
            <span className="profile__followersCount">36</span>
            <span className="profile__followersText">Followers</span>
          </div>
        </div>
      </div>
      <div className="profile__tabs">
        <ul>
          <li>Tweets</li>
          <li>Tweets & replies</li>
          <li>Media</li>
          <li>Likes</li>
        </ul>
      </div>
      <TweetFeed tweets={tweets} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  tweets: state.tweet.tweets,
});

export default connect(mapStateToProps, { getTweets })(Profile);
