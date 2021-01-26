import React from 'react';
import { Route } from 'react-router-dom';

const LayoutRoute = ({component: Component, layout: Layout, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            <Layout>
                <Component {...props}></Component>
            </Layout>
        )} />
    )
}

export default LayoutRoute
