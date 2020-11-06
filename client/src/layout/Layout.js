import React from "react";
import {
  useHistory,
  BrowserRouter as Router,
} from "react-router-dom";
import "./Layout.scss";

import Sidebar from "layout/Sidebar";
import Center from "layout/Center";

import { connect } from "react-redux";
import { logout } from "redux/auth/auth.actions";

const Layout = ({ logout }) => {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/landing");
  };
  return (
    <Router>
      <div className="layout">
        <Sidebar />
        <Center />
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
    </Router>
  );
};

export default connect(null, { logout })(Layout);
