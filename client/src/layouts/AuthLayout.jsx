import React from 'react';
import {Grid} from 'semantic-ui-react';
import Sidebar from 'layout/Sidebar/Sidebar';
import {useDispatch, useSelector} from 'react-redux';

const AuthLayout = ({children}) => {

  
  const dispatch = useDispatch();
  const handle = useSelector((state) => state.auth.user.handle);

  return (
    <Grid centered divided>
      <Grid.Row>
        <Grid.Column width={2}>
          <Sidebar handle={handle} />
        </Grid.Column>
        <Grid.Column width={6}>{children}</Grid.Column>
        <Grid.Column width={2}>
          <h1 style={{color: 'white'}}>Right Column</h1>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AuthLayout;
