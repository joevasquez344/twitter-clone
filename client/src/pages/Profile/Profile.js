import React from 'react';
import './Profile.scss';

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
  follow,
  unfollow,
} from 'redux/auth/auth.actions';
import UnfollowModal from 'components/modals/UnfollowModal/UnfollowModal';
import Tabs from 'components/Tabs/Tabs';
import {TABS_DATA} from './data';

class Profile extends React.Component {
  state = {
    editProfileModal: false,
    unfollowModal: false,
    isFollowing: false,
    tabs: TABS_DATA
  };

  handleTabClick = (id) => {
    const {
      userDetails: {_id, handle},
      getUsersPosts,
      getUsersLikedPosts,
      history,
    } = this.props;
    const {tabs} = this.state;

    const prevActiveTab = this.state.tabs.find((tab) => tab.isActive);

    let nextActiveTab = null;

    const updatedTabs = tabs.map((tab) => {
      if (tab.id === id) {
        tab.isActive = true;
        nextActiveTab = tab;
      } else if (prevActiveTab && tab.id === prevActiveTab.id) {
        tab.isActive = false;
      }

      return tab;
    });

    if (nextActiveTab.label === 'Tweets') {
      history.push(`/${handle}`);
      getUsersPosts(handle);
    } else if (nextActiveTab.label === 'Likes') {
      history.push(`/${handle}/likes`);
      getUsersLikedPosts(handle, _id);
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
    this.props.follow(this.props.userDetails.handle);
    this.setState({isFollowing: true});
  };
  handleUnfollow = (handle) => {
    const match = this.props.userDetails.followers.find(
      (u) => u === this.props.user._id
    );

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

    const {
      history,
      user,
      getUserDetails,
      match: {
        params: {handle},
      },
    } = this.props;

    const userDetails = await getUserDetails(handle);

    const checkParams = () => {
      const parameter =
        history.location.pathname.split('/')[1] ||
        history.location.pathname.split('/')[2];

      return parameter === userDetails.handle
        ? this.updateTabs('Tweets')
        : parameter === 'likes'
        ? this.updateTabs('Likes')
        : parameter === 'with_replies'
        ? null
        : parameter === 'media'
        ? null
        : this.updateTabs('Tweets');
    };

    checkParams();

    const following = userDetails.followers.find((u) => u === user._id);

    following
      ? this.setState({isFollowing: true})
      : this.setState({isFollowing: false});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.tabs !== nextState.tabs) {
      return false;
    } else {
      return true;
    }
  }


  render() {
    const {isFollowing, tabs} = this.state;

    return (
      <>
        {this.props.isLoading ? (
          <Spinner />
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
                ) : isFollowing ? (
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
              tabs={tabs}
              handleTabClick={this.handleTabClick}
            />
            {this.props.isLoading ? <Spinner /> : this.renderTabContent()}
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
})(Profile);
