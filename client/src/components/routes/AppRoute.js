import React, {useEffect} from 'react';

import {Route, Redirect} from 'react-router-dom';

import {checkForUserInStorage} from '../../helpers/auth';

import {useSelector, useDispatch} from 'react-redux';
import {getUserDetails} from '../../redux/auth/auth.actions';

const AppRoute = ({component: Component, layout: Layout, path, ...rest}) => {
  const {user, isLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const result = checkForUserInStorage();

  //   if (result === null) return dispatch(getUserDetails(user.handle));
  // }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return <Redirect to="/landing" />;
        } else {
          return (
            <Layout>
              <Component {...props}></Component>
            </Layout>
          );
        }
      }}
    />
  );
};

export default AppRoute;
