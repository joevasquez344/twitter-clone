import React from 'react';
import {useHistory} from 'react-router-dom';
import './Layout.scss';

import Sidebar from 'layout/Sidebar'; 

import {useDispatch, useSelector} from 'react-redux';
import {logout} from 'redux/auth/auth.actions';

const Layout = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const handle = useSelector((state) => state.auth.user.handle);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/landing');
  };

  return (
    <>
      This is the best
      <div className="layout">
        <Sidebar handle={handle} />
        <div style={styles.overflow}>{props.children}</div>

        <div className="trending">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
            eaque nemo beatae deserunt consequatur quia, ducimus praesentium
            perspiciatis magnam exercitationem quibusdam quasi placeat,
            aspernatur fugiat quos consequuntur, cupiditate labore. Animi!
          </p>
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

const styles = {
  overflow: {
    overflowY: 'scroll',
    borderLeft: '1px solid #38444d',
    borderRight: '1px solid #38444d',
  },
};

export default Layout;
