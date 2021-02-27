import React from 'react';

import {Route, Redirect} from 'react-router-dom';

import {useSelector} from 'react-redux';
import Landing from 'pages/Landing/Landing';

const AppRoute = ({component: Component, layout: Layout, ...rest}) => {
  const {user, isLoading} = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user && !isLoading) {
          return <Redirect to="/landing" />;
        } else {
          return (
            <Layout>
              <Component {...props}></Component>
            </Layout>
          );
        }
      }}
    ></Route>
  );
};

export default AppRoute;
