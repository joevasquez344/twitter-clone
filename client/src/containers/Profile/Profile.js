import React, {useState, useEffect} from 'react';
import './Profile.scss';

import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

import Spinner from 'react-bootstrap/Spinner';
import TweetFeed from 'components/tweets/TweetFeed/TweetFeed';
import Header from 'layout/Header';
import UpdateProfileModal from 'components/modals/UpdateProfileModal';
import FollowingButton from 'components/buttons/FollowingButton/FollowingButton';
import {
  getUserDetails,
  getUsersPosts,
  getUsersLikedPosts,
  getFollowers,
  clearUserDetailsFromStorage,
  follow,
  unfollow,
} from 'redux/auth/auth.actions';
import UnfollowModal from 'components/modals/UnfollowModal/UnfollowModal';
import Tabs from 'components/Tabs/Tabs';

class Profile extends React.Component {
  state = {
    editProfileModal: false,
    unfollowModal: false,
    isFollowing: false,
    tabs: [
      {
        id: 1,
        label: 'Tweets',
        isActive: false,
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
      this.props.history.push(`/${this.props.userDetails.handle}`);
      this.props.getUsersPosts(this.props.userDetails.handle);
    } else if (newActiveTab.label === 'Likes') {
      this.props.history.push(`/${this.props.userDetails.handle}/likes`);
      this.props.getUsersLikedPosts(this.props.userDetails.handle);
    }

    this.setState({...this.state, tabs: updatedTabs});
  };

  renderTabContent = () => {
    const activeTab = this.state.tabs.find((tab) => tab.isActive === true);

    if (activeTab) {
      switch (activeTab.label) {
        case 'Tweets':
          const updatedPosts = this.props.userDetails.posts.filter(
            (post) => !post.replyTo
          );
          return (
            <>
              {this.props.isLoading ? (
                <div className="spinner">
                  {' '}
                  {/* Spinner wont work because I am not fetching tweets here. Everthing is fetched at once on Profile mount */}
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <TweetFeed
                  isLoading={this.props.isLoading}
                  posts={updatedPosts}
                />
              )}
            </>
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
    }
  };

  hideEditProfileModal = () =>
    this.setState({...this.state, editProfileModal: false});
  showEditProfileModal = () =>
    this.setState({...this.state, editProfileModal: true});

  hideUnfollowModal = () => this.setState({unfollowModal: false});
  showUnfollowModal = () => this.setState({unfollowModal: true});

  unfollowConfirmation = () => this.showUnfollowModal();

  handleFollow = () => {
    this.props.follow(this.props.userDetails._id);
    this.setState({isFollowing: true});
  };
  handleUnfollow = (handle) => {
    const match = this.props.userDetails.followers.find(
      (u) => u === this.props.user._id
    );
    console.log('match match: ', match);
    if (match) {
      this.props.unfollow(handle);
    }
  };

  handleFollowers = () =>
    this.props.history.push(`/${this.props.userDetails.handle}/followers`);

  handleFollowing = () =>
    this.props.history.push(`/${this.props.userDetails.handle}/following`);

  setFollowButton = () => {
    this.setState({isFollowing: false});
  };

  updateTabs = (status) => {
    const updatedTabs = this.state.tabs.map((tab) => {
      if (tab.label === status) {
        tab.isActive = true;
      }

      return tab;
    });

    this.setState({tabs: updatedTabs});
  };

  async componentDidMount() {
    const userDetails = await this.props.getUserDetails(
      this.props.match.params.handle
    );

    if (this.props.history.location.pathname.split('/')[2] === undefined) {
      this.updateTabs('Tweets');
    } else if (this.props.history.location.pathname.split('/')[2] === 'likes') {
      this.updateTabs('Likes');
    } else if (
      this.props.history.location.pathname.split('/')[2] === 'with_replies'
    ) {
      // GET USERS TWEETS WITH REPLIES
    } else if (this.props.history.location.pathname.split('/')[2] === 'media') {
      // GET USERS MEDIA TWEETS
    }

    const following = userDetails.followers.find(
      (u) => u === this.props.user._id
    );

    if (following) return this.setState({isFollowing: true});
    else return this.setState({isFollowing: false});
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Next State: ', nextState);
    if (this.state.tabs !== nextState.tabs) {
      return false;
    } else {
      return true;
    }
    // const currentActiveTab = this.state.tabs.find(
    //   (tab) => tab.isActive === true
    // );
    // this.state.tabs.forEach(tab => {
    //   if(currentActiveTab.id === tab.id) {

    //   }
    // })
  }

  render() {
    console.log('Prop', this.props);
    return (
      <>
        {this.props.isLoading ? (
          <div className="spinner">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="profile">
            <Header />
            {this.state.editProfileModal ? (
              <UpdateProfileModal hideModal={this.hideEditProfileModal} />
            ) : null}
            <div className="profile__banner">
              <img src="" alt="" />
            </div>

            <div className="profile__info">
              <div className="profile__config">
                <img src="" className="profile__image" />
                {this.props.user._id === this.props.userDetails._id ? (
                  <button
                    onClick={this.showEditProfileModal}
                    className="profile__editBtn"
                  >
                    Edit Profile
                  </button>
                ) : this.state.isFollowing ? (
                  <>
                    <div className="profile__followingBtn">
                      {' '}
                      <FollowingButton
                        unfollowConfirmation={this.unfollowConfirmation}
                      />
                    </div>
                    {this.state.unfollowModal ? (
                      <UnfollowModal
                        hideModal={this.hideUnfollowModal}
                        handleUnfollow={this.handleUnfollow}
                        user={this.props.userDetails}
                        setFollowButton={this.setFollowButton}
                      />
                    ) : null}
                  </>
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

            <Tabs
              tabs={this.state.tabs}
              handleTabClick={this.handleTabClick}
              userDetails={this.props.userDetails}
            />
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
  unfollow,
  clearUserDetailsFromStorage,
})(Profile);
