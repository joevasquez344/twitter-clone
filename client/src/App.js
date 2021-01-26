import React, {useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import './App.scss';

import PrivateRoute from 'components/PrivateRoute';
import AppRoute from 'components/routes/AppRoute';
import LayoutRoute from 'components/routes/LayoutRoute';

import {useDispatch, useSelector} from 'react-redux';
// import { setUser } from "./redux/auth/auth.actions";

import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Layout from './layout';
import Home from 'containers/Home/Home';
import Profile from 'containers/Profile/Profile';
import Friends from 'containers/Friends/Friends';

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {user, isLoading, error} = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!user) {
  //     history.push('/landing');
  //   }
  // }, [user]);

  return (
    <div className="app">
      <Switch>
        {/* <PrivateRoute
          exact
          path="/"
          name="Layout"
          component={Layout}
        /> */}
        <AppRoute exact path="/" layout={Layout} component={Home} />
        <AppRoute exact path="/user/:id" layout={Layout} component={Profile} />
        <AppRoute
          exact
          path="/user/:id/followers"
          layout={Layout}
          component={Friends}
        />
        <AppRoute
          exact
          path="/user/:id/followers"
          layout={Layout}
          component={Friends}
        />

        {/* <LayoutRoute exact path='/' layout={Layout} component={Home} /> */}

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

export default App;
