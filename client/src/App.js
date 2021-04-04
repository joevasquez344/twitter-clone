import React, {useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import './App.scss';

import {getUserDetails} from 'redux/auth/auth.actions';

import AppRoute from 'components/routes/AppRoute';

import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Layout from './layout';
import Home from 'containers/Home/Home';
import Profile from 'containers/Profile/Profile';
import Friends from 'containers/Friends/Friends';
import PostDetails from 'containers/PostDetails/PostDetails';

const App = () => {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {}, []);
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
        <AppRoute exact path="/" layout={Layout} component={Home} />
        <AppRoute exact path="/home" layout={Layout} component={Home} />
        <AppRoute exact path="/:handle" layout={Layout} component={Profile} />
        <AppRoute
          exact
          path="/:handle/likes"
          layout={Layout}
          component={Profile}
          fetchData={getUserDetails}
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
