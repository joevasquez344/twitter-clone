import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.scss";

import firebase from "./firebase/config";

import { connect } from "react-redux";
import { setUser } from "./redux/auth/auth.actions";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Layout from "./layout";

const App = ({ setUser, user }) => {
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        history.push("/");
      } else {
        history.push("/landing");
      }
    });
  }, []);

  return (
    <div className="app">
      <Switch>
        <Route
          exact
          path="/"
          name="Layout"
          render={(props) => {
            if (user) {
              return <Layout {...props} />;
            }
          }}
        />
        <Route
          exact
          path="/landing"
          name="Landing"
          render={(props) => <Landing {...props} />}
        />
        <Route
          exact
          path="/login"
          name="Login"
          render={(props) => <Login {...props} />}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  user: state.auth.user,
});

// const AppWithAuth = withRouter(connect(mapStateToProps, { setUser })(App));

// export default AppWithAuth;
export default connect(mapStateToProps, { setUser })(App);
