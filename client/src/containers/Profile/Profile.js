import React, {useState, useEffect} from 'react';
import './Profile.scss';

import {useDispatch, useSelector} from 'react-redux';

import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

import TweetFeed from 'components/tweets/TweetFeed/TweetFeed';
import Header from 'layout/Header';
import UpdateProfileModal from 'components/modals/UpdateProfileModal';
import {
  getUserDetails,
  getUsersPosts,
  getUsersLikedPosts,
  getFollowers,
  clearUserDetailsFromStorage,
  follow,
} from 'redux/auth/auth.actions';
import {render} from '@testing-library/react';

class Profile extends React.Component {
  state = {
    isModalPresent: false,
    tabs: [
      {
        id: 1,
        label: 'Tweets',
        isActive: true,
      },
      {
        id: 2,
        label: 'Tweets & Replies',
        isActive: false,
      },
      {
        id: 3,
        label: 'Media',
        isActive: false,
      },
      {
        id: 4,
        label: 'Likes',
        isActive: false,
      },
    ],
  };

  hideModal = () => this.setState({...this.state, isModalPresent: false});
  showModal = () => this.setState({...this.state, isModalPresent: true});

  handleTabClick = (id) => {
    const currentActiveTab = this.state.tabs.find(
      (tab) => tab.isActive === true
    );

    let newActiveTab = null;

    const updatedTabs = this.state.tabs.map((tab) => {
      if (tab.id === id) {
        tab.isActive = true;
        newActiveTab = tab;
      } else if (currentActiveTab && tab.id === currentActiveTab.id) {
        tab.isActive = false;
      }

      return tab;
    });

    if (newActiveTab.label === 'Tweets') {
      this.props.getUserDetails(this.props.match.params.id);
    } else if (newActiveTab.label === 'Likes') {
      this.props.getUserDetails(this.props.match.params.id);
    }

    this.setState({...this.state, tabs: updatedTabs});
  };

  handleFollowers = () => {
    // this.props.getFollowers(this.props.match.params.id);

    this.props.history.push(`/user/${this.props.match.params.id}/followers`);
  };

  // BACKEND WORK - TODO
  // Create new routes that target specifics, such as getUsersPosts, getUsersLikedPosts (already done), getUsersMedia, etc.
  // Every one of these end points will give a rerender for the TweetFeed component
  // This will help keep up to date with new user data
  // EXAMPLE: Say you click on another users profile... you would have that users current data at that time, but say
  // you have been idle for 10 minutes on that users profile and that user has been tweeting and liking posts in the mean time, you would be
  // able to have this users new/updated data if you click on the tabs: tweets, likes, etc. due to fetching this data every time you click on those tabs

  // FRONTEND WORK - TODO
  // When the Profile components mounts, check to see which tab is active... fetch data according to the tab status
  // (tweets - getUsersTweets, likes - getUsersLikedPosts, etc.)

  // Once the Profile component mounts and the tab status checker has ran, for every tab click after, fetch data based on tab status and check to see if state has changed, then rerender
  // if there is new data

  // Keep in mind, whenever a new tab is active/clicked, no matter what, fetch relevant data from the DB, and check to see if that recent data fetched
  // is different from the current state of your redux store, if so, rerender with the new data, if not dont rerender and keep
  // current state
  // PURPOSE - Eliminates unnecessary rerenders and helps perfomance

  // FINAL NOTE FOR THESE COMMENTS
  // Think about this more because there are better ways
  // Tweak backend getUserDetails endpoint to return less data than needed
  // Only return users tweets instead of the whole userDetails object
  // (Currently, I'm technically making 2 DB fetches on Profile component mount and requesting similar/same data)
  // (If i'm forcing to show the users tweets first when the Profile component mounts, just fetch users tweets only from DB)
  // You will fetch more of this users data when you interact more with his/her profile
  // ( Maybe this is the wave of the data fetching flow with web development?? )
  // ( I feel like sending back a huge object based on a profile fetch isn't the move )

  renderTabContent = () => {
    const activeTab = this.state.tabs.find((tab) => tab.isActive === true);

    switch (activeTab.label) {
      case 'Tweets':
        const updatedPosts = this.props.userDetails.posts.filter(
          (post) => !post.replyTo
        );
        return (
          <TweetFeed isLoading={this.props.isLoading} posts={updatedPosts} />
        );

      case 'Tweets & Replies':
        return (
          <TweetFeed
            isLoading={this.props.isLoading}
            posts={this.props.userDetails.posts}
          />
        );

      case 'Likes':
        return (
          <TweetFeed
            isLoading={this.props.isLoading}
            posts={this.props.userDetails.likes}
          />
        );
    }
  };

  handleFollow = () => {
    this.props.follow(this.props.match.params.id);
  };

  handleFollowers = () => {
    this.props.history.push(`/user/${this.props.userDetails._id}/followers`);
  };

  handleFollowing = () => {
    this.props.history.push(`/user/${this.props.userDetails._id}/following`);
  };

  componentDidMount() {
    this.props.getUserDetails(this.props.match.params.id);
  }

  render() {
    return (
      <>
        {this.props.isLoading ? (
          <h1>Loading</h1>
        ) : (
          <div className="profile">
            <Header />
            {this.state.isModalPresent ? (
              <UpdateProfileModal hideModal={this.hideModal} />
            ) : null}
            <div className="profile__banner">
              <img src="" alt="" />
            </div>

            <div className="profile__info">
              <div className="profile__config">
                <img src="" className="profile__image" />
                {this.props.user._id === this.props.userDetails._id ? (
                  <button onClick={this.showModal} className="profile__editBtn">
                    Edit Profile
                  </button>
                ) : (
                  <div onClick={this.handleFollow} className="profile__editBtn">
                    Follow
                  </div>
                )}
              </div>

              <div className="profile__names">
                <h5>{this.props.userDetails.handle}</h5>
                <small>@{this.props.userDetails.handle}</small>
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
                <div onClick={this.handleFollowing}>
                  <span className="profile__followingCount">
                    {this.props.userDetails.following.length}
                  </span>
                  <span className="profile__followingText">Following</span>
                </div>
                <div onClick={this.handleFollowers}>
                  <span className="profile__followersCount">
                    {this.props.userDetails.followers.length}
                  </span>
                  <span className="profile__followersText">Followers</span>
                </div>
              </div>
            </div>

            <div className="profile__tabs">
              <ul>
                {this.state.tabs.map((tab) => {
                  return (
                    <li
                      className={
                        tab.isActive ? 'profile__tab--active' : 'profile__tab'
                      }
                      onClick={() => this.handleTabClick(tab.id)}
                      key={tab.id}
                    >
                      {tab.label}
                    </li>
                  );
                })}
              </ul>
            </div>
            {this.renderTabContent()}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  userDetails: state.auth.userDetails,
  posts: state.post.posts,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getUserDetails,
  getUsersPosts,
  getUsersLikedPosts,
  getFollowers,
  follow,
  clearUserDetailsFromStorage,
})(Profile);
