import React, {useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import './App.scss';

import {getUserDetails} from 'redux/auth/auth.actions';

import AppRoute from 'components/routes/AppRoute';
import AuthLayout from 'layouts/AuthLayout';

import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Layout from './layout';
import Home from 'pages/Home/Home';
import Profile from 'pages/Profile/Profile2';
import Friends from 'pages/Friends/Friends'
import PostDetails from 'pages/PostDetails/PostDetails';

const App = () => {
  const history = useHistory();

  return (
    <div className="app">
      <Switch>
        <Route
          exact
          path="/"
          name="Default Auth"
          render={() => history.push('/home')}
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
        {/* <AppRoute exact path="/" layout={Layout} component={Home} />
        <AppRoute exact path="/home" layout={Layout} component={Home} /> */}
        <AppRoute exact path="/" layout={AuthLayout} component={Home} />
        <AppRoute exact path="/home" layout={AuthLayout} component={Home} />
        <AppRoute exact path="/:handle" layout={Layout} component={Profile} />
        <AppRoute
          exact
          path="/:handle/likes"
          layout={Layout}
          component={Profile}
        />
        <AppRoute
          exact
          path="/:handle/status/:postId/likes"
          layout={Layout}
          component={PostDetails}
        />
        <AppRoute
          exact
          path="/:handle/followers"
          layout={Layout}
          component={Friends}
        />
        <AppRoute
          exact
          path="/:handle/following"
          layout={Layout}
          component={Friends}
        />
        <AppRoute
          exact
          path="/:handle/status/:postId"
          layout={Layout}
          component={PostDetails}
        />
        {/* <AppRoute
          exact
          path="/compose/tweet"
          layout={Layout}
          component={PostDetails}
        /> */}
      </Switch>
    </div>
  );
};

export default App;
