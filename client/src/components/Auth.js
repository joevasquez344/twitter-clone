import React from 'react';
import { useSelector} from 'react-redux';

const Auth = ({component: Component}) => {
  const authUser = useSelector((state) => state.auth.user);

  authUser ? <Component {...props} /> : null;
};

export default Auth;
