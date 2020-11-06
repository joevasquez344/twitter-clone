import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./scss/main.scss";
import { BrowserRouter as Router, HashRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
