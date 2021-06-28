import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter as Router, HashRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './redux/store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
