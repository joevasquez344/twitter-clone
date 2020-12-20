import React from "react";
import routes from "../routes";
import {
  Switch,
  Route,
  HashRouter,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import Home from "containers/Home/Home";

class Center extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div style={styles.overflow}>
        {/* <Home /> */}

        <Switch>
          {routes.map((route, idx) => {
            if (!route.component) {
              return null;
            }
            return (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => <route.component {...props} />}
              />
            );
          })}
        </Switch>
      </div>
    );
  }
}

const styles = {
  overflow: {
    overflowY: "scroll",
    borderLeft: "1px solid #38444d",
    borderRight: "1px solid #38444d",
  },
};

export default Center;
