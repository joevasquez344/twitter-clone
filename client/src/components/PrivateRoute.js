import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// const PrivateRoute = ({component: Component, ...rest}) => {
//   const dispatch = useDispatch();
//   const {user, isLoading} = useSelector((state) => state.auth);

//   return <Route {...rest} render={(props => {
//       if(!user && !isLoading) {
//           return <Redirect to='/landing' />
//       } else {
//         return <Component {...props} />
//       }
//   })} />;
// };

const PrivateRoute = ({component: Component, ...rest}) => {
  const {user, isLoading} = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        !user && !isLoading ? (
          <Redirect to="/landing" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default PrivateRoute;
