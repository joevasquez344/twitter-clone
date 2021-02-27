import React, {useState, useEffect} from 'react';
import './Sidebar.scss';
import {useHistory} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {getUserDetails} from '../../redux/auth/auth.actions';

import TwitterIcon from 'components/icons/TwitterIcon';
import DownArrowIcon from 'components/icons/DownArrowIcon';
import TweetModal from 'components/modals/TweetModal/TweetModal';

const Sidebar = ({handle}) => {
  const [isModalPresent, setIsModalPresent] = useState(false);
  const [tabs, setTabs] = useState([
    {
      id: 1,
      label: 'Home',
      icon: 'fas fa-home fa-2x',
      isActive: false,
      path: '/home',
    },
    {
      id: 2,
      label: 'Explore',
      icon: 'fas fa-hashtag fa-2x',
      isActive: false,
      path: '/explore',
    },
    {
      id: 3,
      label: 'Notifications',
      icon: 'fas fa-bell fa-2x',
      isActive: false,
      path: '/notifications',
    },
    {
      id: 4,
      label: 'Profile',
      icon: 'far fa-user fa-2x',
      isActive: false,
      path: `/${handle}`,
    },
  ]);

  const {isLoading} = useSelector((state) => state.post);
  // const {handle, _id} = useSelector((state) => state.auth.user);

  console.log('Handle: ', handle);

  const dispatch = useDispatch();

  const showModal = () => setIsModalPresent(true);
  const hideModal = () => {
    setIsModalPresent(false);
  };

  const history = useHistory();

  const handleHomeRoute = () => {
    history.push('/home');
  };
  const handleProfileRoute = () => {
    // dispatch(getUserDetails(userID));
    history.push(`/${handle}`);
  };

  const handleTabClick = (tab) => {
    const currentActiveTab = tabs.find((tab) => tab.isActive === true);

    // let newActiveTab = null;

    const updatedTabs = tabs.map((t) => {
      if (t.id === tab.id) {
        t.isActive = true;
        history.push(tab.path);
        // newActiveTab = tab;
      } else if (currentActiveTab && t.id === currentActiveTab.id) {
        t.isActive = false;
      }

      return t;
    });

    setTabs(updatedTabs);

    // if (newActiveTab.label === 'Tweets') {
    //   this.props.getUserDetails(this.props.userDetails);
    //   this.props.history.push(`/${this.props.userDetails.handle}`);
    // } else if (newActiveTab.label === 'Likes') {
    //   this.props.history.push(`/${this.props.userDetails.handle}/likes`);
    //   this.props.getUserDetails(this.props.userDetails);
    // }

    // this.setState({...this.state, tabs: updatedTabs});
  };

  useEffect(() => {
    const activeTab = tabs.find((tab) => tab.isActive === true);

    const path = window.location.pathname;
    const extendedPath = '/' + window.location.pathname.split('/')[1];

    const updatedTabs = tabs.map((tab) => {
      if (tab.path === path || tab.path === extendedPath) {
        tab.isActive = true;
      } else if (activeTab && tab.id === activeTab.id) {
        tab.isActive = false;
      }

      return tab;
    });

    setTabs(updatedTabs);
  }, [window.location.href]);

  console.log('Tabs: ', tabs);

  return (
    <>
      {' '}
      <div className="sidebar">
        <header>
          <TwitterIcon />
        </header>
        <ul>
          {/* <li onClick={handleHomeRoute}>
            <div className="sidebar__shortWrap">
              <span>
                {' '}
                <i className="fas fa-home fa-2x"></i>
              </span>

              <span>Home</span>
            </div>
          </li>
          <li>
            <div className="sidebar__shortWrap">
              <span>
                <i className="fas fa-hashtag fa-2x"></i>
              </span>
              <span>Explore</span>
            </div>
          </li>
          <li>
            <div className="sidebar__shortWrap">
              <span>
                <i className="fas fa-bell fa-2x"></i>
              </span>
              <span>Notifications</span>
            </div>
          </li>
          <li onClick={handleProfileRoute}>
            <div className="sidebar__shortWrap">
              <span>
                <i className="far fa-user fa-2x"></i>
              </span>
              <span>Profile</span>
            </div>
          </li>
          <li>
            <button onClick={showModal}>Tweet</button>
          </li> */}
          {tabs.map((tab) => {
            return (
              <li onClick={() => handleTabClick(tab)} key={tab.id}>
                <div className="sidebar__shortWrap">
                  <span>
                    <i
                      style={tab.isActive ? {color: '#1da1f2'} : null}
                      className={tab.icon}
                    ></i>
                  </span>
                  <span style={tab.isActive ? {color: '#1da1f2'} : null}>
                    {tab.label}
                  </span>
                </div>
              </li>
            );
          })}
            <li>
            <button onClick={showModal}>Tweet</button>
          </li>
        </ul>
        <footer>
          <img src="" alt="" />
          <div className="sidebar-user-info">
            <div className="sidebar-display-name">Joe</div>
            <div className="sidebar-handle">@Zook_sc</div>
          </div>
          <div className="sidebar-util-wrapper">
            <DownArrowIcon />
          </div>
        </footer>
      </div>
      {isModalPresent ? <TweetModal hideModal={hideModal} /> : null}
    </>
  );
};

export default Sidebar;
