import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.scss";

import firebase from "./firebase/config";

import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "./redux/auth/auth.actions";

import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Layout from "./layout";

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const state = useSelector((state) => console.log(state));

  useEffect(() => {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     setUser(user);
    //     history.push("/");
    //   } else {
    //     history.push("/landing");
    //   }
    // });
 console.log('State: ', state);
    if(user) {
      history.push('/')
    } else {
      history.push('/landing')
    }
  }, [user]);

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


// const AppWithAuth = withRouter(connect(mapStateToProps, { setUser })(App));

// export default AppWithAuth;
export default App;
