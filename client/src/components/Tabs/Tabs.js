import React from 'react';
import './Tabs.scss';

import TweetFeed from 'components/tweets/TweetFeed/TweetFeed';
import {
    getUsersPosts,
    getUsersLikedPosts,
    getFollowers,
    clearUserDetailsFromStorage,
    follow,
    unfollow,
  } from 'redux/auth/auth.actions';

import {connect} from 'react-redux';

class Tabs extends React.Component {
  
    render() {
      return (
        <div className="profile__tabs">
        <ul>
          {this.props.tabs.map((tab) => {
            return (
              <li
                className={
                  tab.isActive ? 'profile__tab--active' : 'profile__tab'
                }
                onClick={() => this.props.handleTabClick(tab.id)}
                key={tab.id}
              >
                {tab.label}
              </li>
            );
          })}
        </ul>
      </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
      userDetails: state.auth.userDetails 
  })
  
  export default connect(mapStateToProps, {})(Tabs)
  